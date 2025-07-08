'use client'

import OneStepNavBar from '@/components/OneStepNavBar'
import ResumePreview from '@/components/ResumePreview'
import StepNavBar from '@/components/StepNavBar'
import { Resume, Hint } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState, useCallback, KeyboardEvent } from 'react'
import { FaUserGraduate } from 'react-icons/fa'

export default function Page() {
	const params = useSearchParams()
	const resumeId = params.get('resumeId')
	const [resumeData, setResumeData] = useState<Resume | null>(null)
	const [skills, setSkills] = useState<string[]>([])
	const [pendingUpdate, setPendingUpdate] = useState<Partial<Resume> | null>(null)
	const [newSkill, setNewSkill] = useState<string>('')
	const [hints, setHints] = useState<Hint[]>([])
	const [hintsLoading, setHintsLoading] = useState(false)

	// Hàm debounce tùy chỉnh
	const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
		let timeout: NodeJS.Timeout | null = null
		return (...args: Parameters<T>) => {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => func(...args), wait)
		}
	}

	// Fetch resume data
	useEffect(() => {
		const fetchResume = async () => {
			if (!resumeId) return
			try {
				const response = await fetch(`/api/resume/${resumeId}`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (response.ok) {
					const data: Resume = await response.json()
					setResumeData(data)
					setSkills(data.skills || [])
				} else {
					console.error('Failed to fetch resume data')
				}
			} catch (error) {
				console.error('Error getting resume data:', error)
			}
		}
		fetchResume()
	}, [resumeId])

	// Fetch hints for skills
	useEffect(() => {
		const fetchHints = async () => {
			if (!resumeId) return
			try {
				setHintsLoading(true)
				const response = await fetch(`/api/hints?resumeId=${resumeId}&part=skills`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				})
				if (response.ok) {
					const data: Hint[] = await response.json()
					setHints(data)
				} else {
					console.error('Không thể tải gợi ý')
				}
			} catch (error) {
				console.error('Lỗi khi lấy gợi ý:', error)
			} finally {
				setHintsLoading(false)
			}
		}
		fetchHints()
	}, [resumeId])

	const handleUpdate = async (updatedData: Partial<Resume>) => {
		if (!resumeId) return
		try {
			const response = await fetch(`/api/resume/${resumeId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData),
			})
			if (response.ok) {
				const updatedResume: Resume = await response.json()
				setResumeData(updatedResume)
				setPendingUpdate(null)
			} else {
				throw new Error('Failed to update resume')
			}
		} catch (error) {
			console.error('Error updating resume:', error)
		}
	}

	const debouncedHandleUpdate = useCallback(debounce(handleUpdate, 1000), [resumeId])

	useEffect(() => {
		if (pendingUpdate) {
			debouncedHandleUpdate(pendingUpdate)
		}
	}, [pendingUpdate, debouncedHandleUpdate])

	const addNewSkill = () => {
		if (newSkill.trim() === '') return
		const newSkills = [...skills, newSkill.trim()]
		setSkills(newSkills)
		setPendingUpdate({ skills: newSkills })
		setNewSkill('')
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewSkill(e.target.value)
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && newSkill.trim() !== '') {
			addNewSkill()
		}
	}

	const deleteSkill = (item: string) => {
		const newSkills = skills.filter((value) => value !== item)
		setSkills(newSkills)
		setPendingUpdate({ skills: newSkills })
	}

	const handleDeleteHint = async (hintId: string) => {
		try {
			const response = await fetch(`/api/hints?hintId=${hintId}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
			})
			if (response.ok) {
				setHints((prevHints) => prevHints.filter((hint) => hint.id !== hintId))
			} else {
				console.error('Không thể xóa gợi ý')
			}
		} catch (error) {
			console.error('Lỗi khi xóa gợi ý:', error)
		}
	}

	const handleImproveHint = async (hint: Hint) => {
		if (!resumeData) return
		try {
			const response = await fetch('/api/openai/improve', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					hint,
					resumeData: { ...resumeData, photoData: '' },
				}),
			})
			if (response.ok) {
				const data = await response.json()
				setResumeData(data.resumeData)
				setSkills(data.resumeData.skills || [])
				// Xóa gợi ý sau khi cải thiện
				setHints((prevHints) => prevHints.filter((h) => h.id !== hint.id))
				handleDeleteHint(hint.id)
			} else {
				console.error('Không thể cải thiện hồ sơ')
			}
		} catch (error) {
			console.error('Lỗi khi cải thiện hồ sơ:', error)
		}
	}

	return (
		<div className="mb-8 grid grid-cols-1 lg:grid-cols-2">
			<div className="col-span-1">
				<StepNavBar stepName="skill" resumeId={resumeId || ''} />

				{/* FORM BODY */}
				<div className="p-4">
					<div className="grid grid-cols-4 gap-x-4 gap-y-1">
						<div className="col-span-2 flex flex-col justify-center gap-4">
							<div className="flex items-center gap-2">
								<input
									type="text"
									value={newSkill}
									onChange={handleInputChange}
									onKeyDown={handleKeyPress}
									placeholder="Nhập kỹ năng..."
									className="flex-1 rounded border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-gray-600 focus:outline-none"
								/>
								<div
									onClick={addNewSkill}
									className="flex items-center justify-center gap-2 rounded bg-gray-800 px-2 py-1 text-white hover:cursor-pointer hover:bg-gray-600"
								>
									<FaUserGraduate />
									<div>Thêm Kỹ năng</div>
								</div>
							</div>
						</div>

						<div className="col-span-4 mt-4 grid grid-cols-4 gap-2 gap-y-4">
							{skills.map((item, index) => (
								<div
									key={index}
									className="relative col-span-1 flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-800 shadow-sm transition-all duration-200 hover:shadow-md dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
								>
									<span className="truncate text-sm font-medium">{item}</span>
									<button
										onClick={() => deleteSkill(item || '')}
										className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-500 transition-colors duration-150 hover:cursor-pointer hover:bg-red-200 hover:text-red-600 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30"
										title="Xóa kỹ năng"
									>
										<svg
											className="h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Hints Section */}
				<div className="p-4">
					<h2 className="mb-4 text-lg font-semibold text-gray-800">Gợi ý cải thiện kỹ năng</h2>
					{hintsLoading ? (
						// Skeleton Loading
						Array(3)
							.fill(0)
							.map((_, index) => (
								<div
									key={index}
									className="mb-3 flex animate-pulse items-center justify-between rounded-lg bg-gray-200 p-3"
								>
									<div className="h-6 w-3/4 rounded bg-gray-300"></div>
								</div>
							))
					) : hints.length > 0 ? (
						<div className="max-h-64 space-y-3 overflow-y-auto">
							{hints.map((hint) => (
								<div
									key={hint.id}
									className={`rounded-lg p-3 ${
										hint.type === 'success'
											? 'border border-green-400 bg-green-100'
											: 'border border-yellow-400 bg-yellow-100'
									}`}
								>
									<div className="flex items-center justify-between">
										<span className="font-medium text-gray-800">Kỹ năng</span>
										<div className="flex items-center space-x-2">
											<span
												className={`text-sm font-semibold ${
													hint.type === 'success' ? 'text-green-600' : 'text-yellow-600'
												}`}
											>
												{hint.type === 'success' ? 'Thành công' : 'Gợi ý chỉnh sửa'}
											</span>
											{hint.type === 'notice' && (
												<button
													onClick={() => handleImproveHint(hint)}
													className="rounded-md bg-blue-600 px-2 py-1 text-sm font-medium text-white hover:bg-blue-700"
												>
													Cải thiện ngay
												</button>
											)}
											<button
												onClick={() => handleDeleteHint(hint.id)}
												className="rounded-md bg-red-600 px-2 py-1 text-sm font-medium text-white hover:bg-red-700"
											>
												Ẩn đi
											</button>
										</div>
									</div>
									<p className="mt-2 text-gray-600">{hint.content}</p>
								</div>
							))}
						</div>
					) : (
						<div className="text-center text-gray-500">Chưa có gợi ý nào cho kỹ năng</div>
					)}
				</div>

				<OneStepNavBar
					linkPrev={`/editor/experience?resumeId=${resumeId}`}
					linkNext={`/editor/summary?resumeId=${resumeId}`}
				/>
			</div>
			<div className="col-span-1 mx-10 flex h-full flex-col">
				<ResumePreview resumeData={resumeData} />
			</div>
		</div>
	)
}

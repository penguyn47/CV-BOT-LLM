'use client'

import { useActionState, useEffect, useState } from 'react'
import InputField from '../InputField'
import { createResumeWithJD } from '@/lib/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function NewCVWithJDForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [state, formAction] = useActionState(createResumeWithJD, {
		success: false,
		error: false,
		data: { id: '' },
	})

	const router = useRouter()

	useEffect(() => {
		if (state.success) {
			toast.info('Thêm mới CV thành công, tiếp tục tùy chỉnh')
			router.push(`/editor/themes?resumeId=${state.data.id}`)
		}
		if (state.success || state.error) {
			setIsLoading(false)
		}
	}, [state])

	return (
		<div className="flex flex-col gap-4">
			<div className="text-xl font-semibold underline">Thông tin chung của CV:</div>
			<form action={formAction} className="flex flex-col gap-4" onSubmit={() => setIsLoading(true)}>
				<InputField name="title" label="Tên CV" />
				<InputField name="description" label="Mô tả (JD) - Sử dụng AI để tự động hóa tạo CV" type="textarea" />
				{!isLoading && (
					<button
						className="rounded-xl bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700"
						type="submit"
					>
						Tạo CV mới
					</button>
				)}
				{isLoading && (
					<button
						className="flex justify-center rounded-xl bg-gray-800 px-3 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-gray-700"
						type="submit"
					>
						<div className="mr-3 h-5 w-5 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
						Đang khởi tạo CV
					</button>
				)}
			</form>
		</div>
	)
}

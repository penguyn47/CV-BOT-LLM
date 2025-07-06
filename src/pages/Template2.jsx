import React, { useState } from 'react'
import {
	FaPhone,
	FaFax,
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaMapMarkerAlt,
	FaBirthdayCake,
	FaAddressBook,
	FaAddressCard,
	FaUser,
	FaSchool,
} from 'react-icons/fa'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

const debounce = (func, delay) => {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export default function CVTemplate({ data, onContentChange, selectedFont, selectedColor }) {
	const [currentPage, setCurrentPage] = useState(1)
	const [focusedSection, setFocusedSection] = useState(null)

	const togglePage = () => {
		setCurrentPage(currentPage === 1 ? 2 : 1)
	}

	const MapPin = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	)

	const Phone = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
		</svg>
	)

	const Mail = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
			<polyline points="22,6 12,13 2,6" />
		</svg>
	)

	if (!data) {
		console.error('Dữ liệu CV không tồn tại')
		return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>
	}

	const handleKeyDown = (e) => {
		if (e.ctrlKey && e.key === 'a') {
			e.preventDefault()
			return
		}
		const selection = window.getSelection()
		if (selection && selection.toString() === e.target.textContent) {
			if (e.key === 'Delete' || e.key === 'Backspace') {
				e.preventDefault()
				return
			}
		}
	}

	const handleTitleChange = (key, e) => {
		try {
			const title = e.currentTarget.textContent.trim()
			onContentChange(key, { ...data[key], title })
		} catch (error) {
			console.error('Lỗi khi thay đổi tiêu đề:', error)
		}
	}

	const handleContentChange = debounce((key, e) => {
		try {
			if (!e.currentTarget) {
				console.warn('currentTarget is null, skipping content change');
				return;
			}
			const content = e.currentTarget.innerHTML;
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			let newContent = {};

			if (key === 'objective') {
				const contentElement = doc.querySelector('p') || doc.body
				const contentText = contentElement.textContent.trim() || data[key].content
				newContent = { ...data[key], content: contentText }
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				const listItems = Array.from(doc.querySelectorAll('li'))
				const items = listItems
					.map((li) => li.textContent.trim())
					.filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-')
				newContent = { ...data[key], items: items.length > 0 ? items : data[key].items }
			} else if (key === 'experiences') {
				const summaryElement = doc.querySelector('p.font-medium')
				const additionalNoteElement = doc.querySelector('p.italic')
				const experienceItems = Array.from(doc.querySelectorAll('.experience-item'))
				const items = experienceItems
					.map((item) => {
						const itemTitle = item.querySelector('h3')?.textContent.trim() || ''
						const detailItems = Array.from(item.querySelectorAll('li'))
						const details = detailItems
							.map((li) => li.textContent.trim())
							.filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-')
						return { title: itemTitle, details }
					})
					.filter((item) => item.title.trim() !== '' || item.details.length > 0)
				newContent = {
					...data[key],
					summary: summaryElement ? summaryElement.textContent.trim() : data[key]?.summary || '',
					items: items.length > 0 ? items : data[key].items,
					additionalNote: additionalNoteElement
						? additionalNoteElement.textContent.trim()
						: data[key]?.additionalNote || '',
				}
			} else if (key === 'education') {
				const educationItems = Array.from(doc.querySelectorAll('.education-item'))
				const items = educationItems
					.map((item) => {
						const institution = item.querySelector('h3')?.textContent.trim() || ''
						const detailItems = Array.from(item.querySelectorAll('li'))
						const details = detailItems
							.map((li) => li.textContent.trim())
							.filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-')
						return { institution, details }
					})
					.filter((item) => item.institution.trim() !== '' || item.details.length > 0)
				newContent = { ...data[key], items: items.length > 0 ? items : data[key].items }
			}

			if (Object.keys(newContent).length > 0) {
				console.log('Cập nhật dữ liệu:', key, newContent)
				onContentChange(key, newContent)
			}
		} catch (error) {
			console.error('Lỗi khi xử lý thay đổi nội dung:', error)
		}
	}, 300)

	const handleContactChange = (field, value) => {
		try {
			const updatedContact = {
				...(data.contact || {}),
				[field]: value,
			}
			onContentChange('contact', updatedContact)
		} catch (error) {
			console.error('Lỗi khi thay đổi thông tin liên hệ:', error)
		}
	}

	const handleFocus = (e, sectionKey) => {
		const element = e.currentTarget
		element.classList.remove('text-gray-400')
		setFocusedSection(sectionKey)
	}

	const handleBlur = (e, defaultText, key, field = null) => {
		const element = e.currentTarget
		const text = element.textContent.trim()
		try {
			if (text === '') {
				element.textContent = defaultText
				if (field) {
					handleContactChange(field, defaultText)
				} else if (key === 'name' || key === 'subtitle') {
					onContentChange(key, text)
				} else {
					onContentChange(key, { ...data[key], title: defaultText })
				}
			} else {
				if (field) {
					handleContactChange(field, text)
				} else if (key === 'name' || key === 'subtitle') {
					onContentChange(key, text)
				} else {
					onContentChange(key, { ...data[key], title: text })
				}
			}
		} catch (error) {
			console.error('Lỗi khi xử lý blur:', error)
		}
	}

	const handleAddSection = (key) => {
		try {
			let newItem
			if (key === 'experiences') {
				newItem = { title: 'Vị trí mới', details: ['Mô tả công việc mới'] }
				onContentChange(key, {
					...data[key],
					items: [...(data[key].items || []), newItem],
				})
			} else if (key === 'education') {
				newItem = { institution: 'Trường mới', details: ['Thông tin học vấn mới'] }
				onContentChange(key, {
					...data[key],
					items: [...(data[key].items || []), newItem],
				})
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				newItem = 'Kỹ năng/chứng chỉ/sở thích mới'
				onContentChange(key, {
					...data[key],
					items: [...(data[key].items || []), newItem],
				})
			} else if (key === 'objective') {
				return
			}
			console.log(`Đã thêm section mới cho ${key}`)
		} catch (error) {
			console.error('Lỗi khi thêm section:', error)
		}
	}

	const handleDeleteSection = (key, index = null) => {
		try {
			if (key === 'objective') {
				onContentChange(key, { ...data[key], content: '' })
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				if (index !== null) {
					const newItems = data[key].items.filter((_, i) => i !== index)
					onContentChange(key, { ...data[key], items: newItems })
				} else {
					onContentChange(key, { ...data[key], items: [] })
				}
			} else if (key === 'experiences') {
				if (index !== null) {
					const newItems = data[key].items.filter((_, i) => i !== index)
					onContentChange(key, { ...data[key], items: newItems })
				} else {
					onContentChange(key, { ...data[key], items: [], summary: '', additionalNote: '' })
				}
			} else if (key === 'education') {
				if (index !== null) {
					const newItems = data[key].items.filter((_, i) => i !== index)
					onContentChange(key, { ...data[key], items: newItems })
				} else {
					onContentChange(key, { ...data[key], items: [] })
				}
			}
			console.log(`Đã xóa section ${key}${index !== null ? ` tại index ${index}` : ''}`)
			setFocusedSection(null)
		} catch (error) {
			console.error('Lỗi khi xóa section:', error)
		}
	}

	const renderList = (items, defaultItems, listType = 'ul', className = 'list-disc list-inside text-sm space-y-1 ml-0') => {
		const listItems = items?.length > 0 ? items : defaultItems
		const listTag = listType === 'ol' ? 'ol' : 'ul'
		const listClass = listType === 'ol' ? 'list-decimal list-inside text-sm space-y-1 ml-0' : className
		return `<${listTag} class="${listClass}" style="margin-left: 0;">${listItems.map((item) => `<li>${item}</li>`).join('')}</${listTag}>`
	}

	const renderExperienceItems = (items, defaultItems) => {
		if (items?.length > 0) {
			return items
				.map((exp, index) => {
					const details = exp.details?.length > 0 ? exp.details : defaultItems
					return `<div class="mt-3 experience-item relative">
              ${focusedSection === `experiences-${index}`
							? `
                <div class="absolute top-0 right-0 flex gap-2">
                  <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('experiences')}>
                    <FiPlus className="h-4 w-4" />
                  </button>
                  <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('experiences', ${index})}>
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              `
							: ''
						}
              <h3 class="text-lg font-medium text-gray-700">${exp.title || 'Nhân viên kinh doanh'}</h3>
              ${renderList(
							details,
							['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'],
							'ul',
							'list-disc list-inside text-sm mt-1'
						)}
            </div>`
				})
				.join('')
		} else {
			return `<div class="mt-3 experience-item relative">
            ${focusedSection === 'experiences-0'
					? `
              <div class="absolute top-0 right-0 flex gap-2">
                <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('experiences')}>
                  <FiPlus className="h-4 w-4" />
                </button>
                <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('experiences', 0)}>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            `
					: ''
				}
            <h3 class="text-lg font-medium text-gray-700">Nhân viên kinh doanh</h3>
            ${renderList(
					[],
					['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'],
					'ul',
					'list-disc list-inside text-sm mt-1'
				)}
          </div>
          <div class="mt-3 experience-item relative">
            ${focusedSection === 'experiences-1'
					? `
              <div class="absolute top-0 right-0 flex gap-2">
                <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('experiences')}>
                  <FiPlus className="h-4 w-4" />
                </button>
                <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('experiences', 1)}>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            `
					: ''
				}
            <h3 class="text-lg font-medium text-gray-700">Trợ lý marketing</h3>
            ${renderList(
					[],
					['Lập kế hoạch quảng cáo', 'Phân tích hiệu quả chiến dịch'],
					'ul',
					'list-disc list-inside text-sm mt-1'
				)}
          </div>`
		}
	}

	const renderEducationItems = (items, defaultItems) => {
		if (items?.length > 0) {
			return items
				.map((edu, index) => {
					const details = edu.details?.length > 0 ? edu.details : defaultItems
					return `<div class="mt-2 education-item relative">
              ${focusedSection === `education-${index}`
							? `
                <div class="absolute top-0 right-0 flex gap-2">
                  <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('education')}>
                    <FiPlus className="h-4 w-4" />
                  </button>
                  <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('education', ${index})}>
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              `
							: ''
						}
              <h3 class="text-lg font-medium text-gray-700">${edu.institution || 'Đại học Kinh tế Quốc dân'}</h3>
              ${renderList(
							details,
							['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'],
							'ul',
							'list-disc list-inside text-sm mt-1'
						)}
            </div>`
				})
				.join('')
		} else {
			return `<div class="mt-2 education-item relative">
            ${focusedSection === 'education-0'
					? `
              <div class="absolute top-0 right-0 flex gap-2">
                <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('education')}>
                  <FiPlus className="h-4 w-4" />
                </button>
                <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('education', 0)}>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            `
					: ''
				}
            <h3 class="text-lg font-medium text-gray-700">Đại học Kinh tế Quốc dân</h3>
            ${renderList(
					[],
					['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'],
					'ul',
					'list-disc list-inside text-sm mt-1'
				)}
          </div>
          <div class="mt-2 education-item relative">
            ${focusedSection === 'education-1'
					? `
              <div class="absolute top-0 right-0 flex gap-2">
                <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('education')}>
                  <FiPlus className="h-4 w-4" />
                </button>
                <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('education', 1)}>
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            `
					: ''
				}
            <h3 class="text-lg font-medium text-gray-700">Đại học Công nghệ Thông tin</h3>
            ${renderList(
					[],
					['Thạc sĩ Khoa học Máy tính, 2022-2024', 'Nghiên cứu trí tuệ nhân tạo'],
					'ul',
					'list-disc list-inside text-sm mt-1'
				)}
          </div>`
		}
	}

	const contactItems = [
		{ key: 'phone', icon: <FaPhone className="mr-2 mt-1" />, placeholder: '+84 123 456 789' },
		{ key: 'email', icon: <FaEnvelope className="mr-2 mt-1" />, placeholder: 'example@gmail.com' },
		{ key: 'birthday', icon: <FaBirthdayCake className="mr-2 mt-1" />, placeholder: '24/12/2003' },
		{ key: 'location', icon: <FaAddressCard className="mr-2 mt-1" />, placeholder: '123 Đường ABC, Quận 1, TP.HCM' },
	]
	const referencesItems = [
		{ key: 'name', icon: <FaUser className="mr-2 mt-1" />, placeholder: '+84 123 456 789' },
		{ key: 'address', icon: <FaSchool className="mr-2 mt-1" />, placeholder: 'example@gmail.com' },
		{ key: 'phone', icon: <FaPhone className="mr-2 mt-1" />, placeholder: '24/12/2003' },
		{ key: 'email', icon: <FaAddressCard className="mr-2 mt-1" />, placeholder: '123 Đường ABC, Quận 1, TP.HCM' },
	]

	return (
		<>
			<style jsx="true" global="true">{`
				@import url('https://fonts.googleapis.com/css2?family=Poppins:wght300;400;500;600;700&display=swap');
				body {
					font-family: 'Poppins', sans-serif;
				}
					ul, ol {
					margin-left: 0 !important;
				}
			`}</style>
			<div className="min-h-[297mm] bg-white w-[210mm] mx-auto shadow-lg print:shadow-none" style={{ aspectRatio: '210 / 297' }}>
				<div className="flex flex-col md:flex-row w-full h-full">
					<div className="w-full md:w-1/3 bg-slate-400 p-6 text-slate-800" style={{ backgroundColor: selectedColor }}>
						<div className="mb-8">
							<h1
								className="text-4xl font-bold uppercase"
								contentEditable
								suppressContentEditableWarning
								onFocus={(e) => handleFocus(e, 'name')}
								onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
							>
								{data.name || 'Họ và Tên'}
							</h1>
							<div className="border-t-2 border-slate-600 w-12 mt-2"></div>
						</div>

						<ul className="mb-8 relative ml-0 pl-0" style={{ marginLeft: '0', paddingLeft: '0' }}>
							{contactItems.map(({ key, icon, placeholder }, index) => (
								<li
									key={`contact-${key}`}
									className="flex items-start ml-0 pl-0"
									contentEditable
									suppressContentEditableWarning
									onFocus={(e) => handleFocus(e, `contact-${key}`)}
									onBlur={(e) => handleBlur(e, placeholder, 'contact', key)}
								>
									{icon}
									<span className="flex items-center gap-2">{data.contact?.[key] || placeholder}</span>
								</li>
							))}
						</ul>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2 mt-7"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'education')}
								onBlur={(e) => handleTitleChange('education', e)}
							>
								Học vấn
							</h2>
							{focusedSection === 'education' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('education')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('education')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onInput={(e) => handleContentChange('education', e)}
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'education')}
							>
								{data.education.items.map((edu, idx) => (
									<div key={idx} className="mb-4">
										<div className="justify-between">
											<h3 className="text-[15px] font-medium ">{edu.name}</h3>
											<h4 className="mr-5 font-bold"> {edu.period}</h4>
										</div>
										<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
											{Array.isArray(edu.description) &&
												edu.description.map((duty, i) => (
													<li key={i} style={{ marginLeft: '-10px' }}>
														{duty}
													</li>
												))}
										</ul>
									</div>
								))}
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'certificates')}
								onBlur={(e) => handleTitleChange('certificates', e)}
							>
								Chứng chỉ
							</h2>
							{focusedSection === 'certificates' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('certificates')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('certificates')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<ul className="list-disc list-inside space-y-1">
								<div
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'certificates')}
									onInput={(e) => handleContentChange('certificates', e)}
								>
									{data.certificates.items?.map((language, idx) => (
										<li key={idx}>{language}</li>
									))}
								</div>
							</ul>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'otherSkills')}
								onBlur={(e) => handleTitleChange('otherSkills', e)}
							>
								Kỹ năng mềm
							</h2>
							{focusedSection === 'otherSkills' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('otherSkills')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('otherSkills')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<ul className="list-disc list-inside space-y-1">
								<div
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'otherSkills')}
									onInput={(e) => handleContentChange('otherSkills', e)}
								>
									{data.otherSkills.items?.map((language, idx) => (
										<li key={idx}>{language}</li>
									))}
								</div>
							</ul>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'hobbies')}
								onBlur={(e) => handleTitleChange('hobbies', e)}
							>
								Sở thích
							</h2>
							{focusedSection === 'hobbies' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('hobbies')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('hobbies')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<ul className="list-disc list-inside space-y-1">
								<div
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'hobbies')}
									onInput={(e) => handleContentChange('hobbies', e)}
								>
									{data.hobbies.items?.map((language, idx) => (
										<li key={idx}>{language}</li>
									))}
								</div>
							</ul>
						</div>
					</div>

					<div className="w-full md:w-2/3 bg-gray-50 p-6">
						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'objective')}
								onBlur={(e) => handleTitleChange('objective', e)}
							>
								Tóm tắt cá nhân
							</h2>
							{focusedSection === 'objective' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('objective')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('objective')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<p
								contentEditable
								suppressContentEditableWarning
								onInput={(e) => handleContentChange('objective', e)}
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'objective')}
							>
								{data.objective.content}
							</p>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'expertise')}
								onBlur={(e) => handleTitleChange('expertise', e)}
							>
								Kỹ năng cốt lõi
							</h2>
							{focusedSection === 'expertise' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('expertise')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('expertise')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<div
								className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'expertise')}
								onInput={(e) => handleContentChange('expertise', e)}
							>
								<ul className="list-disc pl-5">
									{data.expertise.items?.map((skill, idx) =>
										idx < Math.ceil(data.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
									)}
								</ul>
								<ul className="list-disc pl-5">
									{data.expertise.items?.map((skill, idx) =>
										idx >= Math.ceil(data.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
									)}
								</ul>
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
								onBlur={(e) => handleTitleChange('experiences', e)}
							>
								Kinh nghiệm chuyên môn
							</h2>
							{focusedSection === 'experiences' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('experiences')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('experiences')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<div
								contentEditable
								suppressContentEditableWarning
								onInput={(e) => handleContentChange('experiences', e)}
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
							>
								{data.experiences[0].items.map((exp, idx) => (
									<div key={idx} className="mb-4">
										<h3 className="text-[15px] ">{exp.position}</h3>
										<ul className="list-disc list-inside  mt-2">
											{exp.duties.map((duty, i) => (
												<li key={i}>{duty}</li>
											))}
										</ul>
									</div>
								))}
							</div>
							{data.experiences[0].additionalNote && (
								<p
									className="italic text-sm text-gray-600 mt-2"
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'experiences')}
									onBlur={(e) => handleTitleChange('experiences', e)}
								>
									{data.experiences[0].additionalNote}
								</p>
							)}
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'publicActivity')}
								onBlur={(e) => handleTitleChange('publicActivity', e)}
							>
								Hoạt động xã hội
							</h2>
							{focusedSection === 'publicActivity' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('publicActivity')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('publicActivity')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<div
								contentEditable
								suppressContentEditableWarning
								onInput={(e) => handleContentChange('publicActivity', e)}
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'publicActivity')}
							>
								{data.publicActivity?.items.map((exp, idx) => (
									<div key={idx} className="mb-4">
										<h3 className="text-[15px] ">{exp.name}</h3>
										<ul className="list-disc list-inside  mt-2">
											{exp.description.map((duty, i) => (
												<li key={i}>{duty}</li>
											))}
										</ul>
									</div>
								))}
							</div>
							{data.experiences[0].additionalNote && (
								<p
									className="italic text-sm text-gray-600 mt-2"
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'experiences')}
									onBlur={(e) => handleTitleChange('experiences', e)}
								>
									{data.experiences[0].additionalNote}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
import React, { useRef, useState } from 'react'
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

// Hàm debounce để trì hoãn cập nhật state
const debounce = (func, delay) => {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export default function CVTemplate5({ data, onContentChange, selectedFont, selectedColor }) {
	// Kiểm tra dữ liệu đầu vào
	if (!data) {
		console.error('Dữ liệu CV không tồn tại')
		return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>
	}

	// FAKE
	// const onContentChange = (key, value) => {
	// 	try {
	// 		if (key && value !== undefined && value !== null) {
	// 			setCV((prev) => {
	// 				const prevKey = prev[key] || {}

	// 				if (typeof prevKey === 'object' && typeof value === 'object' && !Array.isArray(value)) {
	// 					return {
	// 						...prev,
	// 						[key]: {
	// 							...prevKey,
	// 							...value,
	// 						},
	// 					}
	// 				}

	// 				return {
	// 					...prev,
	// 					[key]: value,
	// 				}
	// 			})
	// 		}
	// 	} catch (error) {
	// 		console.error('Lỗi khi cập nhật nội dung CV:', error)
	// 	}
	// }
	// FAKE

	// State để theo dõi section đang focus
	const [focusedSection, setFocusedSection] = useState(null)

	// Ref để lưu vị trí con trỏ
	const cursorPositions = useRef({})

	// Hàm lưu vị trí con trỏ
	const saveCursorPosition = (element, key) => {
		const selection = window.getSelection()
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0)
			cursorPositions.current[key] = { startContainer: range.startContainer, startOffset: range.startOffset }
		}
	}

	// Hàm khôi phục vị trí con trỏ
	const restoreCursorPosition = (element, key) => {
		const position = cursorPositions.current[key]
		if (position && element.contains(position.startContainer)) {
			const range = document.createRange()
			try {
				range.setStart(position.startContainer, position.startOffset)
				range.collapse(true)
				const selection = window.getSelection()
				selection.removeAllRanges()
				selection.addRange(range)
			} catch (error) {
				console.warn('Không thể khôi phục vị trí con trỏ:', error)
			}
		}
	}

	// Hàm xử lý keydown để ngăn chặn xóa toàn bộ nội dung
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

	//EDITED
	// Hàm xử lý thay đổi tiêu đề mục
	const handleTitleChange = (key, e) => {
		try {
			const title = e.currentTarget.textContent.trim()
			onContentChange(key, { ...data[key], title })
		} catch (error) {
			console.error('Lỗi khi thay đổi tiêu đề:', error)
		}
	}
	//EDITED

	// Hàm xử lý thay đổi nội dung mục với debounce
	const handleContentChange = debounce((key, e) => {
		try {
			const content = e.currentTarget.innerHTML
			const parser = new DOMParser()
			const doc = parser.parseFromString(content, 'text/html')
			let newContent = {}

			if (key === 'objective') {
				const contentElement = doc.querySelector('p') || doc.body
				const contentText = contentElement.textContent.trim()
				newContent = { ...data[key], content: contentText }
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				const listItems = Array.from(doc.querySelectorAll('li'))
				const items = listItems
					.map((li) => li.textContent.trim())
					.filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-')
				newContent = { ...data[key], items }
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
					items,
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
				newContent = { ...data[key], items }
			}

			if (Object.keys(newContent).length > 0) {
				console.log('Cập nhật dữ liệu:', key, newContent)
				onContentChange(key, newContent)
			}
		} catch (error) {
			console.error('Lỗi khi xử lý thay đổi nội dung:', error)
		}
	}, 300)

	//EDITED
	const handleContactChange = (field, value) => {
		try {
			const updatedContact = {
				...(data.contact || {}), // giữ lại mọi field khác
				[field]: value,
			}
			onContentChange('contact', updatedContact)
		} catch (error) {
			console.error('Lỗi khi thay đổi thông tin liên hệ:', error)
		}
	}
	//EDITED

	// Hàm xử lý focus cho thông tin liên hệ và tiêu đề
	const handleFocus = (e, sectionKey) => {
		const element = e.currentTarget
		element.classList.remove('text-gray-400')
		setFocusedSection(sectionKey)
	}

	// Hàm xử lý blur cho thông tin liên hệ, tiêu đề, name và subtitle
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

	// Hàm xử lý thêm section mới
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
				// Objective không cần thêm section mới, chỉ có một nội dung
				return
			}
			console.log(`Đã thêm section mới cho ${key}`)
		} catch (error) {
			console.error('Lỗi khi thêm section:', error)
		}
	}

	// Hàm xử lý xóa section
	const handleDeleteSection = (key, index = null) => {
		try {
			if (key === 'objective') {
				// Objective chỉ có một nội dung, xóa nội dung
				onContentChange(key, { ...data[key], content: '' })
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				if (index !== null) {
					const newItems = data[key].items.filter((_, i) => i !== index)
					onContentChange(key, { ...data[key], items: newItems })
				} else {
					// Xóa toàn bộ section
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
			setFocusedSection(null) // Reset focus sau khi xóa
		} catch (error) {
			console.error('Lỗi khi xóa section:', error)
		}
	}

	// Helper function to render lists with proper support for both bullet and numbered lists
	const renderList = (items, defaultItems, listType = 'ul', className = 'list-disc list-inside text-sm space-y-1') => {
		const listItems = items?.length > 0 ? items : defaultItems
		const listTag = listType === 'ol' ? 'ol' : 'ul'
		const listClass = listType === 'ol' ? 'list-decimal list-inside text-sm space-y-1' : className

		return `<${listTag} class="${listClass}">${listItems.map((item) => `<li>${item}</li>`).join('')}</${listTag}>`
	}

	// const [sampleData, setSampleData] = useState({
	// 	name: 'Trần Nguyễn Tâm Đan',
	// 	subtitle: 'Nhân Viên Kinh Doanh',
	// 	photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
	// 	contact: {
	// 		sex: 'Nam',
	// 		phone: '0321456987',
	// 		email: 'trannguyentamdan@gmail.com',
	// 		birthday: '16/10/1998',
	// 		location: 'Hà Nội',
	// 		website: '',
	// 		linkedin: '',
	// 	},
	// 	objective: {
	// 		title: 'Mục tiêu nghề nghiệp',
	// 		content:
	// 			'`Xin chào nhà tuyển dụng! Tôi là Trần Nguyễn Tâm Đan, một nhân viên kinh doanh trẻ tuổi đầy đam mê và nhiệt huyết...`',
	// 	},
	// 	expertise: {
	// 		title: 'Lĩnh vực chuyên môn',
	// 		items: ['Quản Lý Điều Hành', 'Chăm Sóc Khách Hàng', 'AccNet', 'Adobe Illustrator'],
	// 	},
	// 	otherSkills: { title: 'Kỹ năng khác', items: ['Quản lý thời gian', 'Giải quyết vấn đề', 'Làm việc nhóm'] },
	// 	hobbies: { title: 'Sở thích', items: ['Thể thao', 'Đọc sách'] },
	// 	references: {
	// 		title: 'Người tham chiếu',
	// 		name: 'Trần Lê Nguyễn Vũ',
	// 		address: 'Trưởng khoa CNTT - Đại học ...',
	// 		phone: '0123456789',
	// 		email: 'abc@gmail.com',
	// 	},
	// 	experiences: [
	// 		{
	// 			title: 'Kinh nghiệm làm việc',
	// 			summary: 'Đây là tóm tắt kinh nghiệm làm việc',
	// 			items: [
	// 				{
	// 					position: 'Nhân Viên Kinh Doanh',
	// 					period: 'Tháng 6 2024 - Tháng 8 2024',
	// 					duties: [
	// 						'Thực hiện các kế hoạch kinh doanh...',
	// 						'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 						'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 					],
	// 				},
	// 				{
	// 					position: 'Nhân Viên Kinh Doanh',
	// 					period: 'Tháng 6 2024 - Tháng 8 2024',
	// 					duties: [
	// 						'Thực hiện các kế hoạch kinh doanh...',
	// 						'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 						'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 					],
	// 				},
	// 				{
	// 					position: 'Nhân Viên Kinh Doanh',
	// 					period: 'Tháng 6 2024 - Tháng 8 2024',
	// 					duties: [
	// 						'Thực hiện các kế hoạch kinh doanh...',
	// 						'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 						'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 					],
	// 				},
	// 			],
	// 			additionalNote: 'Đây là chú thích kinh nghiệm làm việc',
	// 		},
	// 	],
	// 	education: {
	// 		title: 'Lịch sử học vấn',
	// 		items: [
	// 			{
	// 				name: 'Cử nhân Công nghệ Thông tin',
	// 				period: 'Tháng 8 2022 - Tháng 6 2026',
	// 				description: [
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 				],
	// 			},
	// 			{
	// 				name: 'Cử nhân Công nghệ Thông tin',
	// 				period: 'Tháng 8 2022 - Tháng 6 2026',
	// 				description: [
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 				],
	// 			},
	// 		],
	// 	},
	// 	certificates: { items: ['Tiếng Anh', 'Tiếng Pháp'] },
	// })
	const contactItems = [
		{ key: 'sex', icon: '👤', placeholder: '+84 123 456 789' },
		{ key: 'birthday', icon: '📅', placeholder: '+84 123 456 789' },
		{ key: 'email', icon: '✉️', placeholder: 'example@gmail.com' },
		{ key: 'phone', icon: '📞', placeholder: '24/12/2003' },
		{ key: 'website', icon: '🔗', placeholder: '24/12/2003' },
		{ key: 'location', icon: '📍', placeholder: '123 Đường ABC, Quận 1, TP.HCM' },
	]
	const referencesItems = [
		{ key: 'name', icon: <FaUser className="mr-2 mt-1" />, placeholder: '+84 123 456 789' },
		{ key: 'address', icon: <FaSchool className="mr-2 mt-1" />, placeholder: 'example@gmail.com' },
		{ key: 'phone', icon: <FaPhone className="mr-2 mt-1" />, placeholder: '24/12/2003' },
		{ key: 'email', icon: <FaAddressCard className="mr-2 mt-1" />, placeholder: '123 Đường ABC, Quận 1, TP.HCM' },
	]

	return (
		<div className="relative  mx-auto bg-white shadow-lg overflow-hidden font-sans flex w-[260mm]">
			<svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
				<polygon points="0,0 40,0 0,60" fill="#F3F4F6" />
				<polygon points="0,35 0,100 100,100" fill={selectedColor} />
				<polygon points="70,0 100,0 100,100 50,0" fill="white" />
			</svg>
			<div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-md grid grid-cols-12 gap-6">
				{/* Sidebar - Left */}
				<div className="z-999 col-span-4 flex flex-col items-center text-center mt-10">
					<img src="./avatar.png" alt="avatar" className="w-45 h-45 rounded-full mb-4 object-cover z-10" />

					{/* Contact Info */}
					<div className="relative w-full">
						<div
							className="text-sm text-[.92rem] bg-white text-left space-y-[14px] w-full border border-orange-200 rounded shadow-sm -mt-8"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'contact')}
							onBlur={(e) => handleTitleChange('contact', e)}
						>
							{focusedSection === 'contact' && (
								<div className="absolute top-0 right-0 flex gap-2 -mt-5 mr-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300"
										onClick={() => handleAddSection('contact')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300"
										onClick={() => handleDeleteSection('contact')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
							<ul className="text-sm space-y-4 mt-5" style={{ margin: '28px 0px' }}>
								{contactItems.map(({ key, icon, placeholder }, index) => (
									<li
										key={`contact-${key}`}
										className="flex items-start"
										style={{ marginBottom: '12px' }}
										contentEditable
										suppressContentEditableWarning
										onFocus={(e) => handleFocus(e, `contact-${key}`)}
										onBlur={(e) => handleBlur(e, placeholder, 'contact', key)}
									>
										<div className="flex items-start">
											{icon}
											<span className="ml-2">{data.contact?.[key] || placeholder}</span>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Objective */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4 mt-1 text-left"
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'objective')}
								onBlur={(e) => handleTitleChange('objective', e)}
							>
								MỤC TIÊU
							</h2>
							{focusedSection === 'objective' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2 "
										onClick={() => handleAddSection('objective')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('objective')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
						</div>
						<p
							className="text-sm text-[.92rem] text-left pl-3 mb-3"
							contentEditable
							suppressContentEditableWarning
							onInput={(e) => {
								saveCursorPosition(e.currentTarget, 'objective')
								handleContentChange('objective', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'objective'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'objective')}
						>
							{data.objective.content}
						</p>
					</div>

					{/* Skills */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6 w-[100%] pb-6">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 mb-4 mt-1 pl-3 text-left"
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'expertise')}
								onBlur={(e) => handleTitleChange('expertise', e)}
							>
								KĨ NĂNG
							</h2>
							{focusedSection === 'expertise' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2"
										onClick={() => handleAddSection('expertise')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('expertise')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}{' '}
						</div>
						<div
							className="text-left text-sm"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'expertise')}
							onInput={(e) => {
								saveCursorPosition(e.currentTarget, 'expertise')
								handleContentChange('expertise', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'expertise'), 0)
							}}
						>
							<ul className="list-disc list-inside space-y-1">
								{data.expertise.items?.map((skill, idx) => (
									<li key={idx}>{skill}</li>
								))}
							</ul>
						</div>
					</div>

					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6 w-[100%] pb-6 text-left">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 mb-4 mt-1 pl-3"
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'hobbies')}
								onBlur={(e) => handleTitleChange('hobbies', e)}
							>
								SỞ THÍCH
							</h2>
							{focusedSection === 'hobbies' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2"
										onClick={() => handleAddSection('hobbies')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('hobbies')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}{' '}
						</div>
						<div
							contentEditable
							suppressContentEditableWarning
							className="text-sm"
							onInput={(e) => {
								saveCursorPosition(e.currentTarget, 'hobbies')
								handleContentChange('hobbies', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'hobbies'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'hobbies')}
						>
							<ul className="list-disc list-inside text-gray-700 text-sm">
								{data.hobbies.items.map((hobby, idx) => (
									<li key={idx}>{hobby}</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				{/* Main Content - Right */}
				<div className="z-999 col-span-8 space-y-6 mt-15">
					{/* Name and Job */}
					<div className="flex flex-col justify-center items-center">
						<h1
							className="text-[2.7rem] font-600"
							contentEditable
							suppressContentEditableWarning
							onFocus={(e) => handleFocus(e, 'name')}
							onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
						>
							{data.name.toUpperCase() || 'Họ và Tên'}
						</h1>
						<div
							className="w-85 h-[2px] bg-orange-400 rounded-full mt-1 mb-1"
							style={{ backgroundColor: selectedColor }}
						></div>
						<p
							className="text-gray-500 mb-4 text-[1.2rem]"
							contentEditable
							suppressContentEditableWarning
							onFocus={(e) => handleFocus(e, 'subtitle')}
							onBlur={(e) => handleBlur(e, 'Quản Trị Kinh Doanh', 'subtitle')}
						>
							{data.subtitle.toUpperCase() || 'Quản Trị Kinh Doanh'}
						</p>
					</div>

					{/* Education */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4 "
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'education')}
								onBlur={(e) => handleTitleChange('education', e)}
							>
								TRÌNH ĐỘ HỌC VẤN
							</h2>
							{focusedSection === 'education' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2"
										onClick={() => handleAddSection('education')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('education')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
						</div>
						<div
							className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4"
							contentEditable
							suppressContentEditableWarning
							onInput={(e) => {
								saveCursorPosition(e.currentTarget, 'education')
								handleContentChange('education', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'education'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'education')}
						>
							{data.education.items.map((edu, idx) => (
								<div key={idx} className="mb-4">
									<div className="justify-between font-semibold">
										<p className="">🎓 {edu.name}</p>
										<p className="text-black/65">{edu.period}</p>
									</div>
									<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
										{Array.isArray(edu.description) && edu.description.map((duty, i) => <li key={i}>{duty}</li>)}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Work Experience */}
					<div className="bg-white border border-orange-200 p-4 rounded shadow-sm">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4"
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
								onBlur={(e) => handleTitleChange('experiences', e)}
							>
								KINH NGHIỆM VIỆC LÀM
							</h2>
							{focusedSection === 'experiences' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2"
										onClick={() => handleAddSection('experiences')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('experiences')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
						</div>
						<div className="text-sm space-y-4">
							<div
								className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4"
								contentEditable
								suppressContentEditableWarning
								onInput={(e) => {
									saveCursorPosition(e.currentTarget, 'experiences')
									handleContentChange('experiences', e)
									setTimeout(() => restoreCursorPosition(e.currentTarget, 'experiences'), 0)
								}}
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
							>
								{data.experiences[0].items.map((exp, idx) => (
									<div key={idx} className="mb-4">
										<h3 className="text-[15px] font-medium ">🏢 {exp.position}</h3>
										<p className="text-black/65 font-bolder">{exp.period}</p>
										<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
											{exp.duties.map((duty, i) => (
												<li key={i}>{duty}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Activities */}
					<div className="bg-white border border-orange-200 p-4 rounded shadow-sm">
						<div className="relative">
							<h2
								className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4"
								style={{ backgroundColor: selectedColor }}
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'otherSkills')}
								onBlur={(e) => handleTitleChange('otherSkills', e)}
							>
								HOẠT ĐỘNG NGOẠI KHÓA
							</h2>
							{focusedSection === 'otherSkills' && (
								<div className="absolute top-0 right-0 flex gap-2">
									<button
										className="p-1 bg-gray-400 rounded hover:bg-gray-300 mt-2"
										onClick={() => handleAddSection('otherSkills')}
									>
										<FiPlus className="h-4 w-4" />
									</button>
									<button
										className="p-1 bg-red-400 rounded hover:bg-red-300 mt-2 mr-2"
										onClick={() => handleDeleteSection('otherSkills')}
									>
										<FiTrash2 className="h-4 w-4" />
									</button>
								</div>
							)}
						</div>
						<div
							className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'otherSkills')}
							onInput={(e) => {
								saveCursorPosition(e.currentTarget, 'otherSkills')
								handleContentChange('otherSkills', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'otherSkills'), 0)
							}}
						>
							{data.publicActivity?.items.map((exp, idx) => (
								<div key={idx} className="mb-4 mt-5">
									<div className="justify-between font-semibold">
										<p className="">🎓 {exp.name}</p>
										<p className="text-black/65">{exp.period}</p>
									</div>
									<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
										{Array.isArray(exp.description) && exp.description.map((duty, i) => <li key={i}>{duty}</li>)}
									</ul>
								</div>
							))}
							{/* {data.publicActivity.items?.map((skill, idx) => (
								<li key={idx}>{skill}</li>
							))} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

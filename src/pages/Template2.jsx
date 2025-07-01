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

export default function CVTemplate({ data, onContentChange, selectedFont, selectedColor }) {
	const [currentPage, setCurrentPage] = useState(1)

	const togglePage = () => {
		setCurrentPage(currentPage === 1 ? 2 : 1)
	}

	// Biểu tượng SVG dưới dạng thành phần nội tuyến để thay thế các import từ Lucide React
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

	// // Kiểm tra dữ liệu đầu vào
	if (!data) {
		console.error('Dữ liệu CV không tồn tại')
		return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>
	}

	// //FAKE
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
	// //FAKE

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
			onContentChange(key, { ...cv[key], title })
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
				...(cv.contact || {}), // giữ lại mọi field khác
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

	// Helper function to render experience items with proper list support
	const renderExperienceItems = (items, defaultItems) => {
		if (items?.length > 0) {
			return items
				.map((exp, index) => {
					const details = exp.details?.length > 0 ? exp.details : defaultItems
					return `<div class="mt-3 experience-item relative">
              ${
								focusedSection === `experiences-${index}`
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
            ${
							focusedSection === 'experiences-0'
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
            ${
							focusedSection === 'experiences-1'
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

	// Helper function to render education items with proper list support
	const renderEducationItems = (items, defaultItems) => {
		if (items?.length > 0) {
			return items
				.map((edu, index) => {
					const details = edu.details?.length > 0 ? edu.details : defaultItems
					return `<div class="mt-2 education-item relative">
              ${
								focusedSection === `education-${index}`
									? `
                <div class="absolute top-0 right-0 flex gap-2">
                  <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => handleAddSection('education')}>
                    <FiPlus className="h-4 w-4" />
                  </button>
                  <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => handleDeleteSection('education', ${index})}>
                    <FiTrash2 className="h Sama sama4 w-4" />
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
            ${
							focusedSection === 'education-0'
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
            ${
							focusedSection === 'education-1'
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
	// 	publicActivity: {
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

	const [cv, setCV] = useState(data ? data : JSON.parse(JSON.stringify(sampleData)))

	return (
		<>
			{/* Nhập font Poppins từ Google Fonts */}
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
				body {
					font-family: 'Poppins', sans-serif;
				}
			`}</style>
			<div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto bg-white shadow-lg print:shadow-none">
					{currentPage === 1 ? (
						<div className="flex flex-col md:flex-row w-full">
							{/* Cột trái - Trang 1 */}
							<div className="w-full md:w-1/3 bg-slate-400 p-6 text-slate-800">
								<div className="mb-8">
									<h1
										className="text-4xl font-bold uppercase"
										contentEditable
										suppressContentEditableWarning
										onFocus={(e) => handleFocus(e, 'name')}
										onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
									>
										{cv.name || 'Họ và Tên'}
									</h1>
									<div className="border-t-2 border-slate-600 w-12 mt-2"></div>
								</div>

								<ul className="space-y-2 mb-8 relative" style={{ marginLeft: '-25px' }}>
									{contactItems.map(({ key, icon, placeholder }, index) => (
										<li
											key={`contact-${key}`}
											className="flex items-start"
											contentEditable
											suppressContentEditableWarning
											onFocus={(e) => handleFocus(e, `contact-${key}`)}
											onBlur={(e) => handleBlur(e, placeholder, 'contact', key)}
										>
											{icon}
											<span className="flex items-center gap-2">{cv.contact?.[key] || placeholder}</span>
										</li>
									))}
								</ul>

								<div className="mb-8 relative">
									<h2
										className="text-xl font-semibold uppercase mb-2"
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
										onInput={(e) => {
											saveCursorPosition(e.currentTarget, 'education')
											handleContentChange('education', e)
											setTimeout(() => restoreCursorPosition(e.currentTarget, 'education'), 0)
										}}
										onKeyDown={handleKeyDown}
										onFocus={(e) => handleFocus(e, 'education')}
									>
										{cv.education.items.map((edu, idx) => (
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
												onClick={() => handleAddSection('languages')}
											>
												<FiPlus className="h-4 w-4" />
											</button>
											<button
												className="p-1 bg-red-400 rounded hover:bg-red-300"
												onClick={() => handleDeleteSection('languages')}
											>
												<FiTrash2 className="h-4 w-4" />
											</button>
										</div>
									)}
									<ul className="list-disc list-inside space-y-1 pl-1">
										<div
											contentEditable
											suppressContentEditableWarning
											onKeyDown={handleKeyDown}
											onFocus={(e) => handleFocus(e, 'certificates')}
											onInput={(e) => {
												saveCursorPosition(e.currentTarget, 'certificates')
												handleContentChange('certificates', e)
												setTimeout(() => restoreCursorPosition(e.currentTarget, 'certificates'), 0)
											}}
										>
											{cv.certificates.items?.map((language, idx) => (
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
									<ul className="list-disc list-inside space-y-1 pl-1">
										<div
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
											{cv.otherSkills.items?.map((language, idx) => (
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
										Kỹ năng mềm
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
									<ul className="list-disc list-inside space-y-1 pl-1">
										<div
											contentEditable
											suppressContentEditableWarning
											onKeyDown={handleKeyDown}
											onFocus={(e) => handleFocus(e, 'hobbies')}
											onInput={(e) => {
												saveCursorPosition(e.currentTarget, 'hobbies')
												handleContentChange('hobbies', e)
												setTimeout(() => restoreCursorPosition(e.currentTarget, 'hobbies'), 0)
											}}
										>
											{cv.hobbies.items?.map((language, idx) => (
												<li key={idx}>{language}</li>
											))}
										</div>
									</ul>
								</div>
							</div>

							{/* Cột phải - Trang 1 */}
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
										onInput={(e) => {
											saveCursorPosition(e.currentTarget, 'objective')
											handleContentChange('objective', e)
											setTimeout(() => restoreCursorPosition(e.currentTarget, 'objective'), 0)
										}}
										onKeyDown={handleKeyDown}
										onFocus={(e) => handleFocus(e, 'objective')}
									>
										{cv.objective.content}
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
										onInput={(e) => {
											saveCursorPosition(e.currentTarget, 'expertise')
											handleContentChange('expertise', e)
											setTimeout(() => restoreCursorPosition(e.currentTarget, 'expertise'), 0)
										}}
									>
										<ul className="list-disc pl-5">
											{cv.expertise.items?.map((skill, idx) =>
												idx < Math.ceil(cv.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
											)}
										</ul>
										<ul className="list-disc pl-5">
											{cv.expertise.items?.map((skill, idx) =>
												idx >= Math.ceil(cv.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
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
										onInput={(e) => {
											saveCursorPosition(e.currentTarget, 'experiences')
											handleContentChange('experiences', e)
											setTimeout(() => restoreCursorPosition(e.currentTarget, 'experiences'), 0)
										}}
										onKeyDown={handleKeyDown}
										onFocus={(e) => handleFocus(e, 'experiences')}
									>
										{cv.experiences[0].items.map((exp, idx) => (
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
									{cv.experiences[0].additionalNote && (
										<p
											className="italic text-sm text-gray-600 mt-2"
											contentEditable
											suppressContentEditableWarning
											onKeyDown={handleKeyDown}
											onFocus={(e) => handleFocus(e, 'experiences')}
											onBlur={(e) => handleTitleChange('experiences', e)}
										>
											{cv.experiences[0].additionalNote}
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
										hoạt động xã hội
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
										onInput={(e) => {
											saveCursorPosition(e.currentTarget, 'publicActivity')
											handleContentChange('publicActivity', e)
											setTimeout(() => restoreCursorPosition(e.currentTarget, 'publicActivity'), 0)
										}}
										onKeyDown={handleKeyDown}
										onFocus={(e) => handleFocus(e, 'publicActivity')}
									>
										{cv.publicActivity?.items.map((exp, idx) => (
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
									{cv.experiences[0].additionalNote && (
										<p
											className="italic text-sm text-gray-600 mt-2"
											contentEditable
											suppressContentEditableWarning
											onKeyDown={handleKeyDown}
											onFocus={(e) => handleFocus(e, 'experiences')}
											onBlur={(e) => handleTitleChange('experiences', e)}
										>
											{cv.experiences[0].additionalNote}
										</p>
									)}
								</div>
							</div>
						</div>
					) : (
						<div></div>
						// <div className="flex flex-col md:flex-row w-full">
						// 	{/* Cột trái - Trang 2
						// 	<div className="w-full md:w-1/3 bg-slate-400 p-6 print:p-4">
						// 		<div className="space-y-6">
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-lg">CyberCoders · Thực tập sinh Thiết kế</h2>
						// 				<p className="text-slate-600">Phoenix, AZ · 09/2017 - 06/2018</p>
						// 			</div>
						// 		</div>
						// 	</div> */}

						// 	{/* Cột phải - Trang 2 */}
						// 	<div className="w-full md:w-2/3 p-6 print:p-4">
						// 		<div className="space-y-6">
						// 			{/* Chi tiết kinh nghiệm làm việc */}
						// 			<div>
						// 				<ul className="list-disc ml-5 space-y-2 text-slate-700">
						// 					<li>
						// 						Hợp tác với các nhóm kỹ thuật về tuyên bố thiết kế, thời gian thực hiện, chi phí kỹ thuật, ngân
						// 						sách và tuyên bố công việc để quản lý nỗ lực phát triển nhà cung cấp.
						// 					</li>
						// 					<li>Xem xét sản phẩm để tuân thủ yêu cầu Thiết kế cho Sản xuất (DFM).</li>
						// 				</ul>
						// 			</div>

						// 			{/* Xuất bản */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Xuất bản</h2>
						// 				<p className="text-slate-700">
						// 					Duran, Jackie. "Cách tiếp cận sáng tạo để tối ưu hóa quy trình từ thiết kế đến sản xuất."{' '}
						// 					<span className="italic">Tạp chí Kỹ thuật Sản xuất</span>, tập 28, số 3, 2022, trang 87-99.
						// 				</p>
						// 			</div>

						// 			{/* Bài trình bày hội nghị */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Bài trình bày hội nghị
						// 				</h2>
						// 				<p className="text-slate-700">
						// 					"Tiến bộ trong kỹ thuật tạo mẫu nhanh," trình bày tại Hội nghị Quốc tế về Đổi mới Sản xuất 2022,
						// 					San Diego, CA.
						// 				</p>
						// 			</div>

						// 			{/* Tham dự hội nghị */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Tham dự hội nghị
						// 				</h2>
						// 				<ul className="list-disc ml-5 space-y-1 text-slate-700">
						// 					<li>Hội nghị Quốc tế về Đổi mới Sản xuất, 2022</li>
						// 					<li>Triển lãm CAD và Tạo mẫu, 2021</li>
						// 				</ul>
						// 			</div>

						// 			{/* Tài trợ hoặc quỹ nghiên cứu */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Tài trợ hoặc quỹ nghiên cứu
						// 				</h2>
						// 				<p className="text-slate-700">
						// 					Nhận tài trợ 15.000 USD cho nghiên cứu về phân tích ứng suất trong tạo mẫu nhanh, Đại học Bang
						// 					Arizona, 2021
						// 				</p>
						// 			</div>

						// 			{/* Danh hiệu và giải thưởng */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Danh hiệu và giải thưởng
						// 				</h2>
						// 				<ul className="list-disc ml-5 space-y-1 text-slate-700">
						// 					<li>Kỹ sư của Năm, Quest Global, 2023</li>
						// 					<li>Xuất sắc trong Quy trình Sản xuất, ASM International, 2020</li>
						// 				</ul>
						// 			</div>

						// 			{/* Liên kết chuyên môn */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Liên kết và thành viên chuyên môn
						// 				</h2>
						// 				<ul className="list-disc ml-5 space-y-1 text-slate-700">
						// 					<li>Thành viên, Hiệp hội Kỹ sư Cơ khí Hoa Kỳ (ASME)</li>
						// 					<li>Thành viên, Hiệp hội Kỹ sư Sản xuất (SME)</li>
						// 				</ul>
						// 			</div>

						// 			{/* <!-- Training --> */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Đào tạo</h2>
						// 				<ul className="list-disc ml-5 space-y-1 text-slate-700">
						// 					<li>Hội thảo Mô phỏng CAD Nâng cao, Quest Global, 2022</li>
						// 					<li>Chương trình Lãnh đạo trong Kỹ thuật, ASM International, 2021</li>
						// 				</ul>
						// 			</div>

						// 			{/* <!-- Community Outreach --> */}
						// 			<div>
						// 				<h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
						// 					Hoạt động cộng đồng
						// 				</h2>
						// 				<ul className="list-disc ml-5 space-y-1 text-slate-700">
						// 					<li>Tình nguyện viên hướng dẫn cho các kỹ sư trẻ, Chương trình STEM Arizona, 2019-Hiện tại</li>
						// 					<li>Tổ chức các hội thảo cho học sinh trung học về mô phỏng CAD và tạo mẫu</li>
						// 				</ul>
						// 			</div>
						// 		</div>
						// 	</div>
						// </div>
					)}

					{/* <!-- Toggle Button --> */}
					{/* <div className="flex justify-center py-4">
						<button
							onClick={togglePage}
							className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
						>
							{currentPage === 1 ? 'Đi đến Trang 2' : 'Đi đến Trang 1'}
						</button>
					</div> */}
				</div>
			</div>
		</>
	)
}

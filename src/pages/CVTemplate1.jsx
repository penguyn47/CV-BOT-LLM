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

export default function CVTemplate1({ data, onContentChange, selectedFont, selectedColor }) {
	// Kiểm tra dữ liệu đầu vào
	if (!data) {
		console.error('Dữ liệu CV không tồn tại')
		return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>
	}

	//FAKE
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
	//FAKE

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
	// 		phone: '0321456987',
	// 		email: 'trannguyentamdan@gmail.com',
	// 		birthday: '16/10/1998',
	// 		location: 'Hà Nội',
	// 		website: '', // thêm: đề phòng có trường website
	// 		linkedin: '', // thêm: ví dụ bạn mở rộng sau này
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
	// 					duties: [
	// 						'Thực hiện các kế hoạch kinh doanh...',
	// 						'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 						'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 					],
	// 				},
	// 				{
	// 					position: 'Nhân Viên Kinh Doanh',
	// 					duties: [
	// 						'Thực hiện các kế hoạch kinh doanh...',
	// 						'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 						'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 					],
	// 				},
	// 				{
	// 					position: 'Nhân Viên Kinh Doanh',
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
	// 				period: '2022-2026',
	// 				description: [
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 					'Tốt nghiệp loại xuất sắc trường Đại học Khoa học Tự nhiên, ĐHQG TP.HCM',
	// 				],
	// 			},
	// 			{
	// 				name: 'Cử nhân Công nghệ Thông tin',
	// 				period: '2022-2026',
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

	// const sampleData = {
	// 	name: 'Trần Nguyễn Tâm Đan',
	// 	title: 'Nhân Viên Kinh Doanh',
	// 	photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
	// 	contact: {
	// 		phone: '0321456987',
	// 		email: 'trannguyentamdan@gmail.com',
	// 		birthday: '16/10/1998',
	// 		location: 'Hà Nội',
	// 	},
	// 	skills: ['Quản Lý Điều Hành', 'Chăm Sóc Khách Hàng', 'AccNet', 'Adobe Illustrator'],
	// 	languages: ['Tiếng Anh', 'Tiếng Pháp'],
	// 	softSkills: ['Quản lý thời gian', 'Giải quyết vấn đề', 'Làm việc nhóm'],
	// 	references: [
	// 		{
	// 			name: 'Trần Lê Nguyễn Vũ',
	// 			title: 'Trưởng khoa CNTT - Đại học ...',
	// 			phone: '0123456789',
	// 			email: 'abc@gmail.com',
	// 		},
	// 	],
	// 	objective:
	// 		'Xin chào nhà tuyển dụng! Tôi là Trần Nguyễn Tâm Đan, một nhân viên kinh doanh trẻ tuổi đầy đam mê và nhiệt huyết...',
	// 	experiences: [
	// 		{
	// 			position: 'Nhân Viên Kinh Doanh',
	// 			company: 'Công Ty CP ...',
	// 			period: '2022 - 2023',
	// 			duties: [
	// 				'Thực hiện các kế hoạch kinh doanh...',
	// 				'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
	// 				'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
	// 			],
	// 			achievements: ['Best seller 2022', 'Nhân viên xuất sắc 2022', 'Nhân viên sáng tạo', 'Dự án sale xuất sắc'],
	// 		},
	// 	],
	// 	education: [
	// 		{
	// 			degree: 'Quản Trị Kinh Doanh',
	// 			school: 'Đại Học ...',
	// 			period: '2022 - 2023',
	// 			grade: 'Tốt nghiệp loại Giỏi',
	// 		},
	// 	],
	// 	hobbies: ['Thể thao'],
	// }

	return (
		<div className="mx-auto shadow-lg p-6 flex flex-col md:flex-row font-sans w-[270mm] h-[320mm]">
			{/* Sidebar trái */}
			<aside
				className="md:w-1/3 bg-gray-800 text-white border-r border-gray-300 px-4 py-4 mb-6 md:mb-0"
				style={{ backgroundColor: selectedColor }}
			>
				{data.photoUrl && (
					<div className="flex justify-center mb-4">
						<img src={data.photoUrl} alt={data.name} className="w-32 h-32 rounded-full object-cover" />
					</div>
				)}
				<div>
					<h1
						className="text-2xl font-bold text-center mb-2"
						contentEditable
						suppressContentEditableWarning
						onFocus={(e) => handleFocus(e, 'name')}
						onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
					>
						{data.name || 'Họ và Tên'}
					</h1>
					<p
						className="text-center opacity-80 mb-4"
						contentEditable
						suppressContentEditableWarning
						onFocus={(e) => handleFocus(e, 'subtitle')}
						onBlur={(e) => handleBlur(e, 'Quản Trị Kinh Doanh', 'subtitle')}
					>
						{data.subtitle || 'Quản Trị Kinh Doanh'}
					</p>
				</div>

				{/* Thông tin liên hệ */}
				<section className="mb-6">
					<div className="relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'contact')}
							onBlur={(e) => handleTitleChange('contact', e)}
						>
							Thông tin
						</h2>
						{focusedSection === 'contact' && (
							<div className="absolute top-0 right-0 flex gap-2">
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
					</div>

					<ul className="text-sm space-y-1" style={{ marginLeft: '-10px' }}>
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
								<span className="ml-2">{data.contact?.[key] || placeholder}</span>
							</li>
						))}
					</ul>
				</section>

				{/* Kỹ năng */}
				<section className="mb-6">
					<div className="relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'expertise')}
							onBlur={(e) => handleTitleChange('expertise', e)}
						>
							Kỹ năng
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
					</div>

					<ul className="list-disc list-inside text-sm space-y-1">
						<div
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
							{data.expertise.items?.map((skill, idx) => (
								<li key={idx}>{skill}</li>
							))}
						</div>
					</ul>
				</section>

				{/* Ngôn ngữ */}
				<section className="mb-6">
					<div className="relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
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
					</div>

					<ul className="list-disc list-inside text-sm space-y-1">
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
							{data.certificates.items?.map((language, idx) => (
								<li key={idx}>{language}</li>
							))}
						</div>
					</ul>
				</section>

				{/* Kỹ năng mềm */}
				<section className="mb-6">
					<div className="relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
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
					</div>

					<ul className="list-disc list-inside text-sm space-y-1">
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
							{' '}
							{data.otherSkills.items?.map((skill, idx) => (
								<li key={idx}>{skill}</li>
							))}
						</div>
					</ul>
				</section>

				{data.hobbies?.items?.length > 0 && (
					<section>
						<div className="relative">
							<h2
								className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
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
							<ul className="list-disc list-inside  text-sm">
								{data.hobbies.items.map((hobby, idx) => (
									<li key={idx}>{hobby}</li>
								))}
							</ul>
						</div>
					</section>
				)}
			</aside>

			{/* Nội dung chính */}
			<main className="md:w-2/3 bg-gray-100 pl-0 md:pl-6 py-4 px-4">
				{data.objective && (
					<section className="mb-6">
						<div className="relative">
							<h2
								className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'objective')}
								onBlur={(e) => handleTitleChange('objective', e)}
							>
								Mục tiêu nghề nghiệp
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
						</div>

						<p
							className="text-gray-800 text-sm whitespace-pre-line"
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
					</section>
				)}

				{data.experiences?.[0]?.items?.length > 0 && (
					<section className="mb-6">
						<div className="relative">
							<h2
								className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
								onBlur={(e) => handleTitleChange('experiences', e)}
							>
								{data.experiences[0].title || 'Kinh nghiệm làm việc'}
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
						</div>

						<div
							contentEditable
							suppressContentEditableWarning
							className="text-sm text-gray-700"
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
									<h3 className="text-[15px] font-medium ">{exp.position}</h3>
									<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
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
					</section>
				)}

				{data.education?.items?.length > 0 && (
					<section className="mb-6">
						<div className="relative">
							{' '}
							<h2
								className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
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
						</div>

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
							{data.education.items.map((edu, idx) => (
								<div key={idx} className="mb-4">
									<div className="flex justify-between">
										<h3 className="text-[15px] font-medium ">{edu.name}</h3>
										<h4 className="mr-2 font-bold"> {edu.period}</h4>
									</div>
									<ul className="list-disc list-inside text-gray-700 text-sm mt-2">
										{Array.isArray(edu.description) && edu.description.map((duty, i) => <li key={i}>{duty}</li>)}
									</ul>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Người tham chiếu */}
				<section>
					<div
						className="relative mt-5"
						contentEditable
						suppressContentEditableWarning
						onKeyDown={handleKeyDown}
						onFocus={(e) => handleFocus(e, 'references')}
						onBlur={(e) => handleTitleChange('references', e)}
					>
						<h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Người tham chiếu</h2>
						{focusedSection === 'references' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-400 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('references')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-400 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('references')}
								>
									<FiTrash2 className="h-4 w-4" />
								</button>
							</div>
						)}
					</div>
					<ul className="text-sm space-y-1" style={{ marginLeft: '-10px' }}>
						{referencesItems.map(({ key, icon, placeholder }, index) => (
							<li
								key={`references-${key}`}
								className="flex items-start"
								contentEditable
								suppressContentEditableWarning
								onFocus={(e) => handleFocus(e, `references-${key}`)}
								onBlur={(e) => handleBlur(e, placeholder, 'references', key)}
							>
								{icon}
								<span className="ml-2">{data.references?.[key] || placeholder}</span>
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	)
}

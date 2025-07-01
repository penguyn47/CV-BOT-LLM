import React, { useRef, useState } from 'react'
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'
import { FiPlus, FiTrash2 } from 'react-icons/fi'

// Hàm debounce để trì hoãn cập nhật state
const debounce = (func, delay) => {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

// Component CVTemplate2: layout để Thông tin liên hệ nằm bên trái dưới avatar, không indent
export default function CVTemplate2({ data, onContentChange, selectedFont, selectedColor }) {
	// Kiểm tra dữ liệu đầu vào
	// if (!data) {
	//   console.error('Dữ liệu CV không tồn tại');
	//   return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
	// }

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

	// Hàm xử lý thay đổi tiêu đề mục
	const handleTitleChange = (key, e) => {
		try {
			const title = e.currentTarget.textContent.trim()
			onContentChange(key, { ...data[key], title })
		} catch (error) {
			console.error('Lỗi khi thay đổi tiêu đề:', error)
		}
	}

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

	const handleContactChange = (field, value) => {
		try {
			if (data.contact && typeof value === 'string') {
				onContentChange('contact', { ...data.contact, [field]: value })
			}
		} catch (error) {
			console.error('Lỗi khi thay đổi thông tin liên hệ:', error)
		}
	}

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

	return (
		<div
			className="mx-auto bg-white shadow-lg font-sans relative"
			style={{
				fontFamily: selectedFont,
				width: '260mm',
				height: '320mm',
				minHeight: '297mm',
				margin: '0 auto',
				padding: '0',
				boxSizing: 'border-box',
			}}
		>
			{/* Header */}
			<div className="p-6 flex justify-center md:justify-start" style={{ backgroundColor: selectedColor }}>
				<div className="flex items-center">
					<img src="/avatar2.png" alt="Avatar" className="w-40 h-40 object-cover rounded-md border border-gray-300" />
					<div className="ml-6 text-center md:text-left">
						<p
							className="text-sm uppercase text-gray-600"
							contentEditable
							suppressContentEditableWarning
							onFocus={(e) => handleFocus(e, 'subtitle')}
							onBlur={(e) => handleBlur(e, 'Quản Trị Kinh Doanh', 'subtitle')}
						>
							{data.subtitle || 'Quản Trị Kinh Doanh'}
						</p>
						<h1
							className="text-4xl font-bold text-gray-800"
							contentEditable
							suppressContentEditableWarning
							onFocus={(e) => handleFocus(e, 'name')}
							onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
						>
							{data.name || 'Họ và Tên'}
						</h1>
					</div>
				</div>
			</div>

			{/* Section Thông tin liên hệ */}
			<div className="bg-white p-6 pb-2 pt-4">
				<h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
					<ul className="space-y-2 break-words">
						<li className="flex items-center">
							<FaPhone className="mr-2" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-phone')}
								onBlur={(e) => handleBlur(e, '+84 123 456 789', 'contact', 'phone')}
							>
								{data.contact?.phone || '+84 123 456 789'}
							</span>
						</li>
						<li className="flex items-center">
							<FaFax className="mr-2" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-fax')}
								onBlur={(e) => handleBlur(e, '+84 123 456 789', 'contact', 'fax')}
							>
								{data.contact?.fax || '+84 123 456 789'}
							</span>
						</li>
						<li className="flex items-center">
							<FaEnvelope className="mr-2" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-email')}
								onBlur={(e) => handleBlur(e, 'email@example.com', 'contact', 'email')}
							>
								{data.contact?.email || 'email@example.com'}
							</span>
						</li>
					</ul>
					<ul className="space-y-2 break-words">
						<li className="flex items-center">
							<FaFacebook className="mr-2" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-facebook')}
								onBlur={(e) => handleBlur(e, 'facebook.com/username', 'contact', 'facebook')}
							>
								{data.contact?.facebook || 'facebook.com/username'}
							</span>
						</li>
						<li className="flex items-center">
							<FaInstagram className="mr-2" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-instagram')}
								onBlur={(e) => handleBlur(e, 'instagram.com/username', 'contact', 'instagram')}
							>
								{data.contact?.instagram || 'instagram.com/username'}
							</span>
						</li>
						<li className="flex items-start">
							<FaMapMarkerAlt className="mr-2 mt-1" />
							<span
								contentEditable
								suppressContentEditableWarning
								className="text-gray-700"
								onFocus={(e) => handleFocus(e, 'contact-address')}
								onBlur={(e) => handleBlur(e, '123 Đường ABC, Quận 1, TP.HCM', 'contact', 'address')}
							>
								{data.contact?.address || '123 Đường ABC, Quận 1, TP.HCM'}
							</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Body nội dung: 2 cột trên desktop, cột đơn trên mobile */}
			<div className="flex flex-col md:flex-row relative">
				{/* Đường ngăn cách dọc cố định */}
				<div className="hidden md:block absolute left-[86mm] top-0 w-px bg-gray-300" style={{ height: '225mm' }}></div>
				{/* Cột trái */}
				<aside className="md:w-1/3 bg-white p-6">
					<section className="mb-6 relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'objective')}
							onBlur={(e) => handleTitleChange('objective', e)}
						>
							{data.objective?.title || 'Mục tiêu nghề nghiệp'}
						</h2>
						{focusedSection === 'objective' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('objective')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('objective')}
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
								saveCursorPosition(e.currentTarget, 'objective')
								handleContentChange('objective', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'objective'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'objective')}
							dangerouslySetInnerHTML={{
								__html: `<p class="text-gray-700">${
									data.objective?.content ||
									'Phát triển sự nghiệp trong lĩnh vực công nghệ thông tin, đóng góp vào các dự án sáng tạo và đổi mới...'
								}</p>`,
							}}
						/>
					</section>
					<section className="mb-6 relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'expertise')}
							onBlur={(e) => handleTitleChange('expertise', e)}
						>
							{data.expertise?.title || 'Lĩnh vực chuyên môn'}
						</h2>
						{focusedSection === 'expertise' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('expertise')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('expertise')}
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
								saveCursorPosition(e.currentTarget, 'expertise')
								handleContentChange('expertise', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'expertise'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'expertise')}
							dangerouslySetInnerHTML={{
								__html: renderList(
									data.expertise?.items,
									[
										'Thành thạo Microsoft Office (Word, Excel, PowerPoint)',
										'Kỹ năng phân tích dữ liệu',
										'Quản lý dự án',
									],
									'ul',
									'list-disc list-inside text-sm space-y-1'
								),
							}}
						/>
					</section>
					<section className="mb-6 relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'otherSkills')}
							onBlur={(e) => handleTitleChange('otherSkills', e)}
						>
							{data.otherSkills?.title || 'Kỹ năng khác'}
						</h2>
						{focusedSection === 'otherSkills' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('otherSkills')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('otherSkills')}
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
								saveCursorPosition(e.currentTarget, 'otherSkills')
								handleContentChange('otherSkills', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'otherSkills'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'otherSkills')}
							dangerouslySetInnerHTML={{
								__html: renderList(
									data.otherSkills?.items,
									['Lãnh đạo nhóm', 'Giải quyết vấn đề', 'Giao tiếp đa văn hóa'],
									'ul',
									'list-disc list-inside text-sm space-y-1'
								),
							}}
						/>
					</section>
					<section className="relative">
						<h2
							className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'hobbies')}
							onBlur={(e) => handleTitleChange('hobbies', e)}
						>
							{data.hobbies?.title || 'Sở thích'}
						</h2>
						{focusedSection === 'hobbies' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('hobbies')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('hobbies')}
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
								saveCursorPosition(e.currentTarget, 'hobbies')
								handleContentChange('hobbies', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'hobbies'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'hobbies')}
							dangerouslySetInnerHTML={{
								__html: renderList(
									data.hobbies?.items,
									['Đọc sách phát triển bản thân', 'Du lịch khám phá văn hóa', 'Chơi thể thao (bóng đá, cầu lông)'],
									'ul',
									'list-disc list-inside text-sm space-y-1'
								),
							}}
						/>
					</section>
				</aside>
				{/* Cột phải */}
				<main className="md:w-2/3 bg-white p-6">
					<section className="mb-6 relative">
						<h2
							className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'experiences')}
							onBlur={(e) => handleTitleChange('experiences', e)}
						>
							{data.experiences?.title || 'Kinh nghiệm làm việc'}
						</h2>
						{focusedSection === 'experiences' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('experiences')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('experiences')}
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
					</section>
					<section className="mb-6 relative">
						<h2
							className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'education')}
							onBlur={(e) => handleTitleChange('education', e)}
						>
							{data.education?.title || 'Lịch sử học vấn'}
						</h2>
						{focusedSection === 'education' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('education')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
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
					<section className="relative">
						<h2
							className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
							contentEditable
							suppressContentEditableWarning
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'certificates')}
							onBlur={(e) => handleTitleChange('certificates', e)}
						>
							{data.certificates?.title || 'Một số chứng chỉ đạt được'}
						</h2>
						{focusedSection === 'certificates' && (
							<div className="absolute top-0 right-0 flex gap-2">
								<button
									className="p-1 bg-gray-200 rounded hover:bg-gray-300"
									onClick={() => handleAddSection('certificates')}
								>
									<FiPlus className="h-4 w-4" />
								</button>
								<button
									className="p-1 bg-red-200 rounded hover:bg-red-300"
									onClick={() => handleDeleteSection('certificates')}
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
								saveCursorPosition(e.currentTarget, 'certificates')
								handleContentChange('certificates', e)
								setTimeout(() => restoreCursorPosition(e.currentTarget, 'certificates'), 0)
							}}
							onKeyDown={handleKeyDown}
							onFocus={(e) => handleFocus(e, 'certificates')}
						>
							{data.certificates.items?.map((language, idx) => (
								<li key={idx}>{language}</li>
							))}
						</div>
					</section>
				</main>
			</div>
		</div>
	)
}

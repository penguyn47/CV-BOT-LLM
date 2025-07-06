import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import {
	Bold,
	Italic,
	Underline,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	ChevronDown,
	ChevronLeft,
	List,
	ListOrdered,
	Eye,
} from 'lucide-react'
import CVTemplate5 from '@/pages/CVTemplate5'
import CVTemplate4 from '@/pages/Template2'
import CVTemplate3 from '@/pages/Template1'
import CVTemplate2 from '@/pages/CVTemplate2'
import CVTemplate from '@/pages/CVTemplate1'
import RightSidebar from '@/components/RightSidebar'
import LeftSidebar from '@/components/LeftSidebar'
import html2canvas from 'html2canvas-pro'
import { jsPDF } from 'jspdf'
import dataRef from '../../db/ref.json'
import dataProfile from '../../db/profile.json'

export default function CVBuilder() {
	const [selectedFont, setSelectedFont] = useState('Be Vietnam')
	const [selectedLayout, setSelectedLayout] = useState('CVTemplate2')
	const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
	const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
	const [activeContent, setActiveContent] = useState<string | null>(null)
	const [isPreviewMode, setIsPreviewMode] = useState(false)
	const [selectedColor, setSelectedColor] = useState('#FF6B35')
	const [selectedRef, setSelectedRef] = useState('fe')
	const [selectedImage, setSelectedImage] = useState(3)
	const selectedJob = dataRef.find((ref) => ref.code === selectedRef)
	const templates = [CVTemplate, CVTemplate2, CVTemplate3, CVTemplate4, CVTemplate5]
	const SelectedTemplate = templates[selectedImage]
	const [cvData, setCvData] = useState({
		name: dataProfile.profile.name,
		subtitle: dataProfile.target_job.position,
		photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
		contact: {
			sex: 'Nam',
			phone: dataProfile.profile.phone,
			email: dataProfile.profile.email,
			birthday: '16/10/2003',
			location: dataProfile.profile.address,
			website: '',
			linkedin: '',
		},
		objective: {
			title: 'Mục tiêu nghề nghiệp',
			content: selectedJob?.objective.content,
		},

		expertise: {
			title: 'Lĩnh vực chuyên môn',
			items: selectedJob?.expertise.items,
		},

		otherSkills: {
			title: 'Kỹ năng khác',
			items: selectedJob?.otherSkills.items,
		},

		hobbies: {
			title: 'Sở thích',
			items: selectedJob?.hobbies.items,
		},

		references: {
			title: 'Người tham chiếu',
			name: selectedJob?.references.name,
			address: selectedJob?.references.address,
			phone: selectedJob?.references.phone,
			email: selectedJob?.references.email,
		},

		experiences: [
			{
				title: 'Kinh nghiệm làm việc',
				summary: selectedJob?.experiences?.[0]?.summary,
				items: selectedJob?.experiences?.[0]?.items,
				additionalNote: selectedJob?.experiences?.[0]?.additionalNote,
			},
		],

		education: {
			title: 'Lịch sử học vấn',
			items: selectedJob?.education.items,
		},

		publicActivity: {
			title: 'Hoạt động xã hội',
			items: selectedJob?.publicActivity.items,
		},

		certificates: {
			items: selectedJob?.certificates.items,
		},
	})
	useEffect(() => {
		if (!selectedJob) {
			console.log(selectedJob)
			return
		}

		setCvData({
			name: dataProfile.profile.name,
			subtitle: dataProfile.target_job.position,
			photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
			contact: {
				sex: 'Nam',
				phone: dataProfile.profile.phone,
				email: dataProfile.profile.email,
				birthday: '16/10/2003',
				location: dataProfile.profile.address,
				website: '',
				linkedin: '',
			},
			objective: {
				title: 'Mục tiêu nghề nghiệp',
				content: selectedJob.objective.content,
			},
			expertise: {
				title: 'Lĩnh vực chuyên môn',
				items: selectedJob.expertise.items,
			},
			otherSkills: {
				title: 'Kỹ năng khác',
				items: selectedJob.otherSkills.items,
			},
			hobbies: {
				title: 'Sở thích',
				items: selectedJob.hobbies.items,
			},
			references: {
				title: 'Người tham chiếu',
				name: selectedJob.references.name,
				address: selectedJob.references.address,
				phone: selectedJob.references.phone,
				email: selectedJob.references.email,
			},
			experiences: [
				{
					title: 'Kinh nghiệm làm việc',
					summary: selectedJob.experiences?.[0]?.summary,
					items: selectedJob.experiences?.[0]?.items,
					additionalNote: selectedJob.experiences?.[0]?.additionalNote,
				},
			],
			education: {
				title: 'Lịch sử học vấn',
				items: selectedJob.education.items,
			},
			publicActivity: {
				title: 'Hoạt động xã hội',
				items: selectedJob.publicActivity.items,
			},
			certificates: {
				items: selectedJob.certificates.items,
			},
		})
	}, [selectedRef])

	// useEffect(() => {
	// 	console.log('selectedRef changed:', selectedRef)
	// }, [selectedRef])

	const editorRef = useRef<HTMLDivElement>(null)
	const cvTemplateRef = useRef<HTMLDivElement>(null)

	const navItems = [
		{ id: 'color', label: 'Đổi màu CV', icon: '🎨', contentType: 'color' },
		{ id: 'template', label: 'Đổi mẫu CV', icon: '📄', contentType: 'template', active: true },
		{ id: 'language', label: 'Đổi ngôn ngữ CV', icon: '🌐', contentType: 'language', highlight: true },
		{ id: 'reference', label: 'CV tham khảo', icon: '📋', contentType: 'reference' },
		{ id: 'preview', label: 'Xem trước', icon: '👁️', contentType: null },
		{ id: 'save', label: 'Lưu CV', icon: '💾', contentType: null },
		{ id: 'download', label: 'Tải xuống', icon: '⬇️', contentType: null },
	]

	// Enhanced handleFormat function with better list support
	const handleFormat = (command: string, value?: string) => {
		if (editorRef.current) {
			const selection = window.getSelection()
			if (!selection || selection.rangeCount === 0) return

			const range = selection.getRangeAt(0)
			const container = range.commonAncestorContainer

			// Handle list formatting
			if (command === 'insertOrderedList' || command === 'insertUnorderedList') {
				// Check if we're already in a list
				const listItem =
					container.nodeType === Node.ELEMENT_NODE
						? (container as Element).closest('li')
						: container.parentElement?.closest('li')

				if (listItem) {
					const currentList = listItem.parentElement
					if (currentList) {
						// If we're in a list, convert it to the new type
						const newListType = command === 'insertOrderedList' ? 'ol' : 'ul'
						const currentListType = currentList.tagName.toLowerCase()

						if (newListType !== currentListType) {
							// Convert list type
							const newList = document.createElement(newListType)
							newList.className = currentList.className
							newList.style.cssText = currentList.style.cssText

							// Move all list items to the new list
							while (currentList.firstChild) {
								newList.appendChild(currentList.firstChild)
							}

							// Replace the old list with the new one
							currentList.parentNode?.replaceChild(newList, currentList)

							// Set proper list style
							if (newListType === 'ol') {
								newList.style.listStyleType = 'decimal'
							} else {
								newList.style.listStyleType = 'disc'
							}
						} else {
							// Same type, toggle it off
							document.execCommand('outdent', false)
						}
					}
				} else {
					// Create new list
					document.execCommand(command, false)

					// For ordered lists, ensure proper numbering
					if (command === 'insertOrderedList') {
						const newList = selection.anchorNode?.parentElement?.closest('ol')
						if (newList) {
							newList.style.listStyleType = 'decimal'
						}
					} else {
						const newList = selection.anchorNode?.parentElement?.closest('ul')
						if (newList) {
							newList.style.listStyleType = 'disc'
						}
					}
				}
			} else {
				// Handle other formatting commands
				document.execCommand(command, false, value)
			}

			editorRef.current.focus()
		}
	}

	// Enhanced keyboard shortcuts for list formatting
	const handleKeyDown = (e: KeyboardEvent) => {
		// Ctrl+Shift+7 for ordered list
		if (e.ctrlKey && e.shiftKey && e.key === '7') {
			e.preventDefault()
			handleFormat('insertOrderedList')
		}
		// Ctrl+Shift+8 for unordered list
		else if (e.ctrlKey && e.shiftKey && e.key === '8') {
			e.preventDefault()
			handleFormat('insertUnorderedList')
		}
		// Enter to create new list item
		else if (e.key === 'Enter') {
			const selection = window.getSelection()
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0)
				const listItem =
					range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
						? (range.commonAncestorContainer as Element).closest('li')
						: range.commonAncestorContainer.parentElement?.closest('li')

				if (listItem) {
					// If we're at the end of a list item, create a new one
					const listItemText = listItem.textContent || ''
					const cursorPosition = range.startOffset

					if (cursorPosition >= listItemText.length) {
						// Create new list item
						const newLi = document.createElement('li')
						listItem.parentNode?.insertBefore(newLi, listItem.nextSibling)

						// Move cursor to new list item
						const newRange = document.createRange()
						newRange.setStart(newLi, 0)
						newRange.collapse(true)
						selection.removeAllRanges()
						selection.addRange(newRange)

						e.preventDefault()
					}
				}
			}
		}
		// Backspace to remove empty list items
		else if (e.key === 'Backspace') {
			const selection = window.getSelection()
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0)
				const listItem =
					range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
						? (range.commonAncestorContainer as Element).closest('li')
						: range.commonAncestorContainer.parentElement?.closest('li')

				if (listItem && (listItem.textContent || '').trim() === '') {
					const list = listItem.parentElement
					if (list && (list.tagName === 'OL' || list.tagName === 'UL')) {
						// If this is the only list item, remove the entire list
						if (list.children.length === 1) {
							list.remove()
						} else {
							// Remove just this list item
							listItem.remove()
						}
						e.preventDefault()
					}
				}
			}
		}
	}

	// Add keyboard event listener
	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const handleNavClick = (contentType: string | null) => {
		if (contentType) {
			setIsLeftSidebarOpen(true)
			setIsRightSidebarOpen(false)
			setIsPreviewMode(false)
			setActiveContent(contentType)
		} else if (contentType === null && navItems.find((item) => item.id === 'preview')) {
			setIsPreviewMode(true)
			setIsLeftSidebarOpen(false)
			setIsRightSidebarOpen(false)
			setActiveContent(null)
		} else {
			setIsLeftSidebarOpen(false)
			setIsRightSidebarOpen(true)
			setIsPreviewMode(false)
			setActiveContent(null)
		}
	}

	const toggleRightSidebar = () => {
		setIsRightSidebarOpen(true)
		setIsLeftSidebarOpen(false)
		setIsPreviewMode(false)
		setActiveContent(null)
	}

	const toggleSidebar = () => {
		setIsLeftSidebarOpen(!isLeftSidebarOpen)
		setIsRightSidebarOpen(!isRightSidebarOpen)
		setIsPreviewMode(false)
		if (isLeftSidebarOpen) setActiveContent(null)
	}

	const handleFontChange = (font: string) => {
		setSelectedFont(font)
		if (editorRef.current) {
			editorRef.current.style.fontFamily = font
		}
	}

	const handleLayoutChange = async (layout: string) => {
		setSelectedLayout(layout)
		if (layout === 'CVTemplate2') {
			try {
				const response = await fetch('http://localhost:3000/api/layout')
				const data = await response.json()
				const textFromBackend = data.text
				console.log('Text from backend:', textFromBackend)
				setCvData((prev) => ({
					...prev,
					objective: { ...prev.objective, content: textFromBackend },
				}))
			} catch (error) {
				console.error('Error fetching layout:', error)
			}
		}
	}

	const handleColorChange = (color: string) => {
		setSelectedColor(color)
	}

	const handleRefChange = (ref: string) => {
		setSelectedRef(ref)
	}

	const handleImageChange = (id: number) => {
		setSelectedImage(id)
	}

	const handleContentChange = (key: string, value: any) => {
		try {
			if (key && value !== undefined && value !== null) {
				setCvData((prev) => ({
					...prev,
					[key]: value,
				}))
			}
		} catch (error) {
			console.error('Lỗi khi cập nhật nội dung CV:', error)
		}
	}

	const overrideOklchColors = (element: HTMLElement) => {
		const style = document.createElement('style')
		style.innerHTML = `
      :root {
        --background: #FFFFFF;
        --foreground: #1F2937;
        --card: #FFFFFF;
        --card-foreground: #1F2937;
        --popover: #FFFFFF;
        --popover-foreground: #1F2937;
        --primary: #1F2937;
        --primary-foreground: #FFFFFF;
        --secondary: #F3F4F6;
        --secondary-foreground: #1F2937;
        --muted: #F3F4F6;
        --muted-foreground: #6B7280;
        --accent: #F3F4F6;
        --accent-foreground: #1F2937;
        --destructive: #EF4444;
        --border: #E5E7EB;
        --input: #E5E7EB;
        --ring: #4B5563;
        --chart-1: #F59E0B;
        --chart-2: #10B981;
        --chart-3: #3B82F6;
        --chart-4: #8B5CF6;
        --chart-5: #EC4899;
        --sidebar: #F9FAFB;
        --sidebar-foreground: #1F2937;
        --sidebar-primary: #1F2937;
        --sidebar-primary-foreground: #FFFFFF;
        --sidebar-accent: #F3F4F6;
        --sidebar-accent-foreground: #1F2937;
        --sidebar-border: #E5E7EB;
        --sidebar-ring: #4B5563;
      }
      .dark {
        --background: #1F2937;
        --foreground: #F9FAFB;
        --card: #374151;
        --card-foreground: #F9FAFB;
        --popover: #374151;
        --popover-foreground: #F9FAFB;
        --primary: #D1D5DB;
        --primary-foreground: #1F2937;
        --secondary: #4B5563;
        --secondary-foreground: #F9FAFB;
        --muted: #4B5563;
        --muted-foreground: #9CA3AF;
        --accent: #4B5563;
        --accent-foreground: #F9FAFB;
        --destructive: #F87171;
        --border: #374151;
        --input: #374151;
        --ring: #6B7280;
        --chart-1: #8B5CF6;
        --chart-2: #10B981;
        --chart-3: #EC4899;
        --chart-4: #3B82F6;
        --chart-5: #EF4444;
        --sidebar: #374151;
        --sidebar-foreground: #F9FAFB;
        --sidebar-primary: #8B5CF6;
        --sidebar-primary-foreground: #F9FAFB;
        --sidebar-accent: #4B5563;
        --sidebar-accent-foreground: #F9FAFB;
        --sidebar-border: #374151;
        --sidebar-ring: #6B7280;
      }
      [style*="oklch"] {
        background-color: #FFFFFF !important;
        color: #1F2937 !important;
        border-color: #E5E7EB !important;
      }
		ul, ol {
            margin-left: 0 !important;
        }
    `
		element.appendChild(style)
		return style
	}

	const cleanOklchStyles = (element: HTMLElement) => {
		const elements = element.getElementsByTagName('*')
		for (let el of elements) {
			if (el instanceof HTMLElement) {
				const style = el.getAttribute('style')
				if (style && style.includes('oklch')) {
					el.style.backgroundColor = '#FFFFFF'
					el.style.color = '#1F2937'
					el.style.borderColor = '#E5E7EB'
				}
			}
		}
	}

	const handleDownloadPDF = async () => {
		if (cvTemplateRef.current) {
			try {
				const oldClass = cvTemplateRef.current.className
				cvTemplateRef.current.className = 'w-[210mm] h-[297mm] bg-white shadow-lg'
				const tempStyle = overrideOklchColors(cvTemplateRef.current)
				cleanOklchStyles(cvTemplateRef.current)

				const canvas = await html2canvas(cvTemplateRef.current, {
					scale: 2,
					useCORS: true,
					backgroundColor: '#FFFFFF',
					logging: true,
				})

				tempStyle.remove()
				cvTemplateRef.current.className = oldClass

				const imgData = canvas.toDataURL('image/png')
				const pdf = new jsPDF({
					orientation: 'portrait',
					unit: 'mm',
					format: 'a4',
				})

				const pageWidth = pdf.internal.pageSize.getWidth()
				const imgWidth = pageWidth
				const imgHeight = (canvas.height * imgWidth) / canvas.width

				pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
				pdf.save('cv-preview.pdf')
			} catch (error) {
				console.error('Lỗi khi tạo PDF:', error)
			}
		}
	}

	// Chọn template dựa trên selectedLayout
	const renderTemplate = () => {
		return (
			<SelectedTemplate
				data={cvData}
				onContentChange={handleContentChange}
				selectedFont={selectedFont}
				selectedColor={selectedColor}
			/>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col">
			{/* Preview Mode */}
			{isPreviewMode && (
				<div className="fixed inset-0 z-50 flex flex-col">
					<div className="bg-black text-white p-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<Eye className="h-5 w-5" />
							<span className="text-lg font-medium">Preview Mode</span>
						</div>
						<div className="flex-1 flex justify-center">
							<Button
								variant="outline"
								className="text-white border-white bg-transparent hover:bg-gray-800 px-4 py-2"
								onClick={handleDownloadPDF}
							>
								Tải xuống
							</Button>
						</div>
						<Button
							variant="ghost"
							className="text-white p-0 h-8 w-8 flex items-center justify-center"
							onClick={() => setIsPreviewMode(false)}
						>
							✕
						</Button>
					</div>
					<div className="flex-1 overflow-y-auto p-6 pt-12 pb-20 bg-gray-900/90 flex justify-center items-start gap-4">
						<div
							ref={cvTemplateRef}
							className="w-[210mm] h-[297mm] bg-white shadow-lg"
							style={{ aspectRatio: '210 / 297' }}
						>
							{renderTemplate()}
						</div>
					</div>
				</div>
			)}

			{/* Navigation Header */}
			{!isPreviewMode && (
				<div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-99999">
					<div className="flex flex-wrap gap-2 items-center justify-center">
						{navItems.map((item) => (
							<Button
								key={item.id}
								variant={item.active ? 'default' : 'ghost'}
								size="sm"
								className={`flex items-center gap-2 ${item.highlight ? 'bg-red-500 hover:bg-red-600 text-white' : ''} ${item.active ? 'bg-blue-500 hover:bg-blue-600' : ''
									}`}
								onClick={() => handleNavClick(item.contentType)}
							>
								<span>{item.icon}</span>
								{item.label}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* Formatting Toolbar */}
			{!isPreviewMode && (
				<div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-[57px] left-0 right-0 z-99999 flex justify-center">
					<div className="flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 px-2 text-xs font-normal justify-between min-w-[80px]">
									{selectedLayout}
									<ChevronDown className="h-3 w-3 ml-1" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-[120px]">
								<DropdownMenuItem onClick={() => handleLayoutChange('CVTemplate5')}>CVTemplate5</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleLayoutChange('CVTemplate4')}>CVTemplate4</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleLayoutChange('CVTemplate3')}>CVTemplate3</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleLayoutChange('CVTemplate2')}>CVTemplate2</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleLayoutChange('CVTemplate1')}>CVTemplate1</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-6 px-2 text-xs font-normal justify-between min-w-[80px]">
									{selectedFont}
									<ChevronDown className="h-3 w-3 ml-1" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-[120px]">
								<DropdownMenuItem onClick={() => handleFontChange('Be Vietnam')}>Be Vietnam</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleFontChange('Arial')}>Arial</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleFontChange('Times New Roman')}>Times New Roman</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleFontChange('Roboto')}>Roboto</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<div className="w-px h-4 bg-gray-300 mx-1" />

						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('bold')}>
							<Bold className="h-3 w-3" />
						</Button>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('italic')}>
							<Italic className="h-3 w-3" />
						</Button>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('underline')}>
							<Underline className="h-3 w-3" />
						</Button>

						<div className="w-px h-4 bg-gray-300 mx-1" />

						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('justifyLeft')}>
							<AlignLeft className="h-3 w-3" />
						</Button>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('justifyCenter')}>
							<AlignCenter className="h-3 w-3" />
						</Button>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('justifyRight')}>
							<AlignRight className="h-3 w-3" />
						</Button>
						<Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat('justifyFull')}>
							<AlignJustify className="h-3 w-3" />
						</Button>

						<div className="w-px h-4 bg-gray-300 mx-1" />

						<div className="tooltip">
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 list-button"
								onClick={() => handleFormat('insertUnorderedList')}
								title="Danh sách không đánh số (Ctrl+Shift+8)"
							>
								<List className="h-3 w-3" />
							</Button>
							<span className="tooltiptext">
								Danh sách không đánh số
								<br />
								Ctrl+Shift+8
							</span>
						</div>
						<div className="tooltip">
							<Button
								variant="ghost"
								size="sm"
								className="h-6 w-6 p-0 list-button"
								onClick={() => handleFormat('insertOrderedList')}
								title="Danh sách đánh số (Ctrl+Shift+7)"
							>
								<ListOrdered className="h-3 w-3" />
							</Button>
							<span className="tooltiptext">
								Danh sách đánh số
								<br />
								Ctrl+Shift+7
							</span>
						</div>
					</div>
				</div>
			)}

			{/* Main Content */}
			{!isPreviewMode && (
				<div className="flex min-h-[calc(100vh-120px)] mt-[120px] cv-editor">
					{/* Left Sidebar */}
					{isLeftSidebarOpen && (
						<div className="w-80 fixed left-0 top-[105px] bottom-0 z-10">
							<LeftSidebar
								navItems={navItems}
								onClose={toggleSidebar}
								activeContent={activeContent}
								handleNavClick={handleNavClick}
								selectedColor={selectedColor}
								onColorChange={handleColorChange}
								selectedRef={selectedRef}
								onRefChange={handleRefChange}
								selectedImage={selectedImage}
								onImageChange={handleImageChange}
							/>
						</div>
					)}

					{/* Main CV Editor */}
					<div
						ref={editorRef}
						className={`flex-1 flex justify-center transition-all duration-300 ${isLeftSidebarOpen ? 'pl-100' : ''} ${isRightSidebarOpen ? 'pr-100' : ''
							}`}
					>
						<div className="max-w-4xl w-full pb-20">{renderTemplate()}</div>
					</div>

					{/* Right Sidebar */}
					{isRightSidebarOpen && (
						<div className="w-80 fixed right-0 top-[105px] bottom-0 z-10">
							<RightSidebar />
						</div>
					)}

					{/* Arrow Button to Open Right Sidebar */}
					{!isRightSidebarOpen && (
						<Button
							variant="ghost"
							className="fixed right-4 top-1/2 transform -translate-y-1/2 z-99999 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
							onClick={toggleRightSidebar}
							aria-label="Open Right Sidebar"
						>
							<ChevronLeft className="h-6 w-6 text-gray-600" />
						</Button>
					)}
				</div>
			)}
			<button
				onClick={() => {
					console.log(selectedImage)
				}}
			>
			</button>
		</div>
	)
}

"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
} from "lucide-react"
import CVTemplate from "@/pages/CVTemplate2"
import RightSidebar from "@/components/RightSidebar"
import LeftSidebar from "@/components/LeftSidebar"

export default function CVBuilder() {
  const [selectedFont, setSelectedFont] = useState("Be Vietnam")
  const [selectedLayout, setSelectedLayout] = useState("Bộ cục CV")
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true)
  const [activeContent, setActiveContent] = useState<string | null>(null)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [cvData, setCvData] = useState({
    name: "Nguyễn Ngọc Vy",
    subtitle: "Quản Trị Kinh Doanh Tổng Hợp",
    photoUrl: "https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg",
    contact: {
      phone: "085 234 3477",
      fax: "089 923 0449",
      email: "nguyengocvyyy00@gmail.com",
      facebook: "https://facebook.com/nguyengocvy",
      instagram: "https://instagram.com/nguyengocvy",
      address: "206 Huỳnh Tấn Phát, Quận Hải Châu, Đà Nẵng",
    },
    objective: {
      title: "Mục tiêu nghề nghiệp",
      content:
        "Trở thành Chuyên viên trong lĩnh vực Kinh doanh & Marketing. Tôi hiện đang tìm kiếm hướng đi để phát triển bản thân. Và hiện tôi đang tin cho mình có hội để được làm việc ở môi trường đào tạo chuyên nghiệp và nhiệt huyết.",
    },
    expertise: {
      title: "Lĩnh vực chuyên môn",
      items: [
        "Kinh nghiệm về Microsoft & PowerPoint",
        "Kỹ năng giao tiếp đàm phán tốt",
        "Kinh nghiệm thiết kế trên phần mềm Canva",
        "Kỹ năng quản lý thời gian tốt",
        "Kỹ năng thuyết trình",
        "Giao tiếp tiếng Anh cơ bản",
      ],
    },
    otherSkills: {
      title: "Kỹ năng khác",
      items: [
        "Khả năng phân tích các thông tin kỹ thuật phức tạp",
        "Kỹ năng lãnh đạo làm việc nhóm tốt",
        "Chú ý chi tiết",
        "Khả năng giải quyết vấn đề xuất sắc",
      ],
    },
    hobbies: {
      title: "Sở thích",
      items: ["Đọc sách", "Nấu ăn", "Tập Thể Dục", "Vẽ tranh"],
    },
    experiences: {
      title: "Kinh nghiệm làm việc",
      summary: "2 năm trong lĩnh vực liên quan",
      items: [
        {
          title: "Social Media Marketing tại Lạc Tự Wedding",
          details: [
            "Viết content nội dung cho bài viết trên Fanpage",
            "Tham gia ekip chụp hình, quay phim tại nơi làm việc",
            "Đề ra các chiến lược cho quảng cáo và tiếp thị",
          ],
        },
        {
          title: "Marketing Associate tại CT7810Y AZ Media",
          details: [
            "Lập kế hoạch tiếp thị cho CTY",
            "Tham gia các dự án PR của các đơn vị hợp tác",
            "Viết content và thiết kế hình ảnh cho CTY",
          ],
        },
        {
          title: "Social Marketing Manager tại Shop Hoa Tươi",
          details: [
            "Lập kế hoạch chiến lược tiếp thị và quảng bá thương hiệu",
            "Thiết kế logo, banner, background của Shop",
            "Tư vấn chăm sóc khách hàng của Shop",
            "Viết content và nội dung cho bài viết trên page của Shop",
          ],
        },
      ],
      additionalNote:
        "Và ngoài ra còn có kinh nghiệm ở một số công việc liên quan như bán hàng online, tư vấn viên telesales.",
    },
    education: {
      title: "Lịch sử học vấn",
      items: [
        {
          institution: "Đại Học Kiến Trúc Đà Nẵng",
          details: [
            "Dự kiến tốt nghiệp nhận bằng tạm thời tháng 1/2022",
            "Hoàn thành tín chỉ Quản trị Kinh doanh Tổng hợp",
            "Điểm tích lũy qua 4 năm học đại học loại Giỏi trên 8.0",
            "Thành tích trong hoạt động phong trào loại Xuất sắc",
          ],
        },
      ],
    },
    certificates: {
      title: "Một số chứng chỉ đạt được",
      items: [
        "Chứng chỉ Digital Marketing của Google",
        "Chứng chỉ Digital Body Language",
        "Chứng chỉ Digital Networking Strategies",
      ],
    },
  })

  const editorRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { id: "color", label: "Đổi màu CV", icon: "🎨", contentType: "color" },
    { id: "template", label: "Đổi mẫu CV", icon: "📄", contentType: "template", active: true },
    { id: "language", label: "Đổi ngôn ngữ CV", icon: "🌐", contentType: "language", highlight: true },
    { id: "reference", label: "CV tham khảo", icon: "📋", contentType: null },
    { id: "preview", label: "Xem trước", icon: "👁️", contentType: null },
    { id: "save", label: "Lưu CV", icon: "💾", contentType: null },
    { id: "download", label: "Tải xuống", icon: "⬇️", contentType: null },
  ]

  const handleNavClick = (contentType: string | null) => {
    if (contentType) {
      setIsLeftSidebarOpen(true)
      setIsRightSidebarOpen(false)
      setActiveContent(contentType)
    } else {
      setIsLeftSidebarOpen(false)
      setIsRightSidebarOpen(true)
      setActiveContent(null)
    }
  }

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(true)
    setIsLeftSidebarOpen(false)
    setActiveContent(null)
  }

  const toggleSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen)
    setIsRightSidebarOpen(!isRightSidebarOpen)
    if (isLeftSidebarOpen) setActiveContent(null)
  }

  const handleFormat = (command: string, value: string | undefined = undefined) => {
    if (editorRef.current) {
      document.execCommand(command, false, value)
      editorRef.current.focus()
    }
  }

  const handleFontChange = (font: string) => {
    setSelectedFont(font)
    if (editorRef.current) {
      editorRef.current.style.fontFamily = font
    }
  }

  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout)
    // Implement layout change logic if needed
  }

  const handleContentChange = (key: string, value: any) => {
    setCvData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle section click from CV template
  const handleSectionClick = (sectionTitle: string) => {
    setSelectedSection(sectionTitle)
    // Ensure right sidebar is open when section is clicked
    if (!isRightSidebarOpen) {
      setIsRightSidebarOpen(true)
      setIsLeftSidebarOpen(false)
      setActiveContent(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-20">
        <div className="flex flex-wrap gap-2 items-center justify-center">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              className={`flex items-center gap-2 ${item.highlight ? "bg-red-500 hover:bg-red-600 text-white" : ""} ${item.active ? "bg-blue-500 hover:bg-blue-600" : ""}`}
              onClick={() => handleNavClick(item.contentType)}
            >
              <span>{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 fixed top-[57px] left-0 right-0 z-20 flex justify-center">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 px-2 text-xs font-normal justify-between min-w-[80px]">
                {selectedLayout}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[120px]">
              <DropdownMenuItem onClick={() => handleLayoutChange("Bộ cục CV")}>Bộ cục CV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLayoutChange("Bố cục đơn giản")}>Bố cục đơn giản</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLayoutChange("Bố cục chuyên nghiệp")}>
                Bố cục chuyên nghiệp
              </DropdownMenuItem>
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
              <DropdownMenuItem onClick={() => handleFontChange("Be Vietnam")}>Be Vietnam</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFontChange("Arial")}>Arial</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFontChange("Times New Roman")}>Times New Roman</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFontChange("Roboto")}>Roboto</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("bold")}>
            <Bold className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("italic")}>
            <Italic className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("underline")}>
            <Underline className="h-3 w-3" />
          </Button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("justifyLeft")}>
            <AlignLeft className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("justifyCenter")}>
            <AlignCenter className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("justifyRight")}>
            <AlignRight className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("justifyFull")}>
            <AlignJustify className="h-3 w-3" />
          </Button>

          <div className="w-px h-4 bg-gray-300 mx-1" />

          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("insertUnorderedList")}>
            <List className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => handleFormat("insertOrderedList")}>
            <ListOrdered className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-120px)] mt-[120px]">
        {/* Left Sidebar */}
        {isLeftSidebarOpen && (
          <div className="w-80 fixed left-0 top-[105px] bottom-0 z-10">
            <LeftSidebar
              navItems={navItems}
              onClose={toggleSidebar}
              activeContent={activeContent}
              handleNavClick={handleNavClick}
            />
          </div>
        )}

        {/* Main CV Editor */}
        <div
          ref={editorRef}
          className={`flex-1 flex justify-center transition-all duration-300 ${
            isLeftSidebarOpen ? "pl-100" : ""
          } ${isRightSidebarOpen ? "pr-100" : ""}`}
        >
          <div className="max-w-4xl w-full">
            <CVTemplate
              data={cvData}
              onContentChange={handleContentChange}
              selectedFont={selectedFont}
              onSectionClick={handleSectionClick}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        {isRightSidebarOpen && (
          <RightSidebar cvData={cvData} selectedSection={selectedSection} onSectionClick={handleSectionClick} />
        )}

        {/* Arrow Button to Open Right Sidebar */}
        {!isRightSidebarOpen && (
          <Button
            variant="ghost"
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
            onClick={toggleRightSidebar}
            aria-label="Open Right Sidebar"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </Button>
        )}
      </div>
    </div>
  )
}
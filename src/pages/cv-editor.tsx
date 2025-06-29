import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "lucide-react";
import CVTemplate2 from "@/pages/CVTemplate2";
import RightSidebar from "@/components/RightSidebar";
import LeftSidebar from "@/components/LeftSidebar";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

// Giả lập CVTemplate1 cho khả năng chuyển đổi template
const CVTemplate1 = () => <div>Template 1 Placeholder</div>;

export default function CVBuilder() {
    const [selectedFont, setSelectedFont] = useState("Be Vietnam");
    const [selectedLayout, setSelectedLayout] = useState("CVTemplate2");
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [activeContent, setActiveContent] = useState<string | null>(null);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FF6B35");
    const [cvData, setCvData] = useState({
        name: '',
        subtitle: '',
        photoUrl: '/avatar2.png',
        contact: {
            phone: '',
            fax: '',
            email: '',
            facebook: '',
            instagram: '',
            address: '',
        },
        objective: {
            title: 'Mục tiêu nghề nghiệp',
            content: '',
        },
        expertise: {
            title: 'Lĩnh vực chuyên môn',
            items: [],
        },
        otherSkills: {
            title: 'Kỹ năng khác',
            items: [],
        },
        hobbies: {
            title: 'Sở thích',
            items: [],
        },
        experiences: {
            title: 'Kinh nghiệm làm việc',
            summary: '',
            items: [],
            additionalNote: '',
        },
        education: {
            title: 'Lịch sử học vấn',
            items: [],
        },
        certificates: {
            title: 'Một số chứng chỉ đạt được',
            items: [],
        },
    });

    const editorRef = useRef<HTMLDivElement>(null);
    const cvTemplateRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { id: "color", label: "Đổi màu CV", icon: "🎨", contentType: "color" },
        { id: "template", label: "Đổi mẫu CV", icon: "📄", contentType: "template", active: true },
        { id: "language", label: "Đổi ngôn ngữ CV", icon: "🌐", contentType: "language", highlight: true },
        { id: "reference", label: "CV tham khảo", icon: "📋", contentType: null },
        { id: "preview", label: "Xem trước", icon: "👁️", contentType: null },
        { id: "save", label: "Lưu CV", icon: "💾", contentType: null },
        { id: "download", label: "Tải xuống", icon: "⬇️", contentType: null },
    ];

    const handleNavClick = (contentType: string | null) => {
        if (contentType) {
            setIsLeftSidebarOpen(true);
            setIsRightSidebarOpen(false);
            setIsPreviewMode(false);
            setActiveContent(contentType);
        } else if (contentType === null && navItems.find(item => item.id === "preview")) {
            setIsPreviewMode(true);
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
            setActiveContent(null);
        } else {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(true);
            setIsPreviewMode(false);
            setActiveContent(null);
        }
    };

    const toggleRightSidebar = () => {
        setIsRightSidebarOpen(true);
        setIsLeftSidebarOpen(false);
        setIsPreviewMode(false);
        setActiveContent(null);
    };

    const toggleSidebar = () => {
        setIsLeftSidebarOpen(!isLeftSidebarOpen);
        setIsRightSidebarOpen(!isRightSidebarOpen);
        setIsPreviewMode(false);
        if (isLeftSidebarOpen) setActiveContent(null);
    };

    const handleFormat = (command: string, value: string | undefined = undefined) => {
        if (editorRef.current) {
            document.execCommand(command, false, value);
            editorRef.current.focus();
        }
    };

    const handleFontChange = (font: string) => {
        setSelectedFont(font);
        if (editorRef.current) {
            editorRef.current.style.fontFamily = font;
        }
    };

    const handleLayoutChange = async (layout: string) => {
        setSelectedLayout(layout);
        if (layout === "CVTemplate2") {
            try {
                const response = await fetch('http://localhost:3000/api/layout');
                const data = await response.json();
                const textFromBackend = data.text;
                console.log('Text from backend:', textFromBackend);
                setCvData((prev) => ({
                    ...prev,
                    objective: { ...prev.objective, content: textFromBackend },
                }));
            } catch (error) {
                console.error('Error fetching layout:', error);
            }
        }
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    const handleContentChange = (key: string, value: any) => {
        try {
            if (key && value !== undefined && value !== null) {
                setCvData((prev) => ({
                    ...prev,
                    [key]: value,
                }));
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật nội dung CV:', error);
        }
    };

    const overrideOklchColors = (element: HTMLElement) => {
        const style = document.createElement('style');
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
    `;
        element.appendChild(style);
        return style;
    };

    const cleanOklchStyles = (element: HTMLElement) => {
        const elements = element.getElementsByTagName('*');
        for (let el of elements) {
            if (el instanceof HTMLElement) {
                const style = el.getAttribute('style');
                if (style && style.includes('oklch')) {
                    el.style.backgroundColor = '#FFFFFF';
                    el.style.color = '#1F2937';
                    el.style.borderColor = '#E5E7EB';
                }
            }
        }
    };

    const handleDownloadPDF = async () => {
        if (cvTemplateRef.current) {
            try {
                const oldClass = cvTemplateRef.current.className;
                cvTemplateRef.current.className = "w-[210mm] h-[297mm] bg-white shadow-lg";
                const tempStyle = overrideOklchColors(cvTemplateRef.current);
                cleanOklchStyles(cvTemplateRef.current);

                const canvas = await html2canvas(cvTemplateRef.current, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#FFFFFF',
                    logging: true,
                });

                tempStyle.remove();
                cvTemplateRef.current.className = oldClass;

                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const pageWidth = pdf.internal.pageSize.getWidth();
                const imgWidth = pageWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('cv-preview.pdf');
            } catch (error) {
                console.error('Lỗi khi tạo PDF:', error);
            }
        }
    };

    // Chọn template dựa trên selectedLayout
    const renderTemplate = () => {
        switch (selectedLayout) {
            case "CVTemplate2":
                return (
                    <CVTemplate2
                        data={cvData}
                        onContentChange={handleContentChange}
                        selectedFont={selectedFont}
                        selectedColor={selectedColor}
                    />
                );
            // case "CVTemplate1":
            //     return (
            //         <CVTemplate1
            //             data={cvData}
            //             onContentChange={handleContentChange}
            //             selectedFont={selectedFont}
            //             selectedColor={selectedColor}
            //         />
            //     );
            default:
                return (
                    <CVTemplate2
                        data={cvData}
                        onContentChange={handleContentChange}
                        selectedFont={selectedFont}
                        selectedColor={selectedColor}
                    />
                );
        }
    };

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
            )}

            {/* Formatting Toolbar */}
            {!isPreviewMode && (
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
                                <DropdownMenuItem onClick={() => handleLayoutChange("CVTemplate2")}>CVTemplate2</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleLayoutChange("CVTemplate1")}>CVTemplate1</DropdownMenuItem>
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
            )}

            {/* Main Content */}
            {!isPreviewMode && (
                <div className="flex min-h-[calc(100vh-120px)] mt-[120px]">
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
                            />
                        </div>
                    )}

                    {/* Main CV Editor */}
                    <div
                        ref={editorRef}
                        className={`flex-1 flex justify-center transition-all duration-300 ${isLeftSidebarOpen ? "pl-100" : ""} ${isRightSidebarOpen ? "pr-100" : ""}`}
                    >
                        <div className="max-w-4xl w-full pb-20">
                            {renderTemplate()}
                        </div>
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
                            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                            onClick={toggleRightSidebar}
                            aria-label="Open Right Sidebar"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-600" />
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}
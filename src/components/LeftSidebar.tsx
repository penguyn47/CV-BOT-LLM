import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

interface NavItem {
    id: string
    label: string
    icon: string
    active?: boolean
    highlight?: boolean
    contentType: string | null
}

interface Reference {
    code: string
    name: string
    subtitle: string
}

interface LeftSidebarProps {
    navItems: NavItem[]
    onClose: () => void
    activeContent: string | null
    handleNavClick: (contentType: string | null) => void
    selectedColor: string
    onColorChange: (color: string) => void
    onReferenceSelect: (code: string) => void // Thêm prop
    initialReference?: string
}

const colors = [
    ["#FF6B35", "#2C2C2C", "#1E3A8A", "#DC2626", "#7C3AED", "#059669", "#F87171", "#6B7280"],
    ["#EA580C", "#F59E0B", "#1E40AF", "#60A5FA", "#65A30D", "#84CC16", "#3730A3", "#F8BBD0"],
    ["#7C2D12", "#047857", "#0891B2", "#FB923C", "#EAB308", "#1F2937", "#0F172A", "#A21CAF"],
    ["#D97706", "#10B981", "#2563EB", "#BE123C", "#9333EA", "#F43F5E", "#0EA5E9", "#94A3B8"],
    ["#991B1B", "#4F46E5", "#15803D", "#0369A1", "#C026D3", "#FACC15", "#3F3F46", "#E11D48"],
]

const templates = [
    { id: 1, name: "Phong cách", subtitle: "", bgColor: "bg-slate-800" },
    { id: 2, name: "Greeting", subtitle: "2 phiên bản", bgColor: "bg-blue-600" },
    { id: 3, name: "Creative", subtitle: "", bgColor: "bg-gradient-to-br from-blue-400 to-orange-400" },
    { id: 4, name: "Định Xuân Thảo", subtitle: "", bgColor: "bg-gradient-to-br from-purple-500 to-pink-500" },
]

const languages = [
    { code: "en", name: "Tiếng Anh", flag: "🇬🇧" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
]

const references: Reference[] = [
    { code: "fe", name: "Minh Anh", subtitle: "Lập trình viên Frontend" },
    { code: "seo", name: "Quang Huy", subtitle: "Chuyên viên SEO" },
    { code: "ac", name: "Bích Ngọc", subtitle: "Kế toán viên" },
    { code: "uiux", name: "Thảo Nhi", subtitle: "Nhà thiết kế UI/UX" },
    { code: "be", name: "Đức Hiếu", subtitle: "Lập trình viên Backend" },
    { code: "data", name: "Đức Hiếu", subtitle: "Data Analyst" },
    { code: "pm", name: "Đức Hiếu", subtitle: "Project Manager" },
    { code: "qa", name: "Đức Hiếu", subtitle: "QA Engineer" },
]

export default function LeftSidebar({ navItems, onClose, activeContent, handleNavClick, selectedColor, onColorChange, onReferenceSelect }: LeftSidebarProps) {
    const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id)
    const [selectedLanguage, setSelectedLanguage] = useState("vi")
    const [selectedReference, setSelectedReference] = useState("fe")

    const renderColorPicker = () => (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Màu có sẵn</h3>
                <Button
                    variant="ghost"
                    className="text-gray-900 p-0 h-auto"
                    onClick={onClose}
                >
                    ✕
                </Button>
            </div>
            {colors.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-3 justify-start flex-wrap">
                    {row.map((color, colorIndex) => (
                        <button
                            key={`${rowIndex}-${colorIndex}`}
                            onClick={() => onColorChange(color)}
                            className="relative w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            style={{ backgroundColor: color }}
                            aria-label={`Select color ${color}`}
                        >
                            {selectedColor === color && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-green-500 rounded-full p-0.5">
                                        <Check className="w-2 h-2 text-white" strokeWidth={3} />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            ))}
            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium text-gray-900">Màu tùy chỉnh</h3>
                <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-8 h-8 cursor-pointer p-0 border-none appearance-none"
                    aria-label={`Select color ${selectedColor}`}
                />
            </div>
            <div className="mt-4 p-2 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                    Màu đã chọn:{" "}
                    <span className="font-medium" style={{ color: selectedColor }}>
                        {selectedColor}
                    </span>
                </p>
            </div>
        </div>
    )

    const renderTemplatePicker = () => (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Chọn mẫu CV</h3>
                <Button
                    variant="ghost"
                    className="text-gray-900 p-0 h-auto"
                    onClick={onClose}
                >
                    ✕
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`group cursor-pointer ${selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""}`}
                        onClick={() => setSelectedTemplate(template.id)}
                    >
                        <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="aspect-[3/4] relative">
                                <div className={`w-full h-full ${template.bgColor} flex items-center justify-center relative`}>
                                    <div className="w-[85%] h-[90%] bg-white rounded-sm shadow-inner p-2 text-xs">
                                        <div className="space-y-2">
                                            <div className="text-center border-b pb-1">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-1"></div>
                                                <div className="h-2 bg-gray-800 rounded mb-1"></div>
                                                <div className="h-1 bg-gray-500 rounded w-3/4 mx-auto"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1 bg-gray-700 rounded w-1/3"></div>
                                                <div className="h-1 bg-gray-400 rounded"></div>
                                                <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-1 bg-gray-700 rounded w-1/4"></div>
                                                <div className="h-1 bg-gray-400 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                    {template.id === 2 && (
                                        <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full shadow-md"></div>
                                    )}
                                </div>
                            </div>
                        </Card>
                        <div className="mt-2 text-center">
                            <h4 className="text-sm font-semibold text-gray-900">{template.name}</h4>
                            {template.subtitle && <p className="text-xs text-gray-500">{template.subtitle}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderLanguageSelector = () => (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Chọn ngôn ngữ CV</h3>
                <Button
                    variant="ghost"
                    className="text-gray-900 p-0 h-auto"
                    onClick={onClose}
                >
                    ✕
                </Button>
            </div>
            {languages.map((language) => (
                <Button
                    key={language.code}
                    variant="outline"
                    className={`w-full justify-start h-10 px-3 relative bg-white text-gray-900 border-gray-200 hover:bg-gray-50 ${selectedLanguage === language.code ? "border-green-500 bg-green-50" : ""}`}
                    onClick={() => setSelectedLanguage(language.code)}
                >
                    <span className="text-xl mr-2">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                    {selectedLanguage === language.code && <Check className="absolute right-2 h-4 w-4 text-green-600" />}
                </Button>
            ))}
        </div>
    )

    const renderReferencePicker = () => (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Chọn CV tham khảo</h3>
                <Button
                    variant="ghost"
                    className="text-gray-900 p-0 h-auto"
                    onClick={onClose}
                >
                    ✕
                </Button>
            </div>
            {references.map((reference) => (
                <Button
                    key={reference.code}
                    variant="outline"
                    className={`w-full justify-start h-10 px-3 relative bg-white text-gray-900 border-gray-200 hover:bg-gray-50 ${selectedReference === reference.code ? "border-green-500 bg-green-50" : ""}`}
                    onClick={() => {
                        setSelectedReference(reference.code)
                        onReferenceSelect(reference.code)
                    }}
                >
                    <span className="text-sm font-medium">{reference.name} - {reference.subtitle}</span>
                    {selectedReference === reference.code && <Check className="absolute right-2 h-4 w-4 text-green-600" />}
                </Button>
            ))}
        </div>
    )

    return (
        <div className="w-100 fixed left-0 top-[105px] bottom-0 z-10">
            <Card className="h-full flex flex-col py-0 rounded-lg">
                <CardContent className="p-4 flex-1 overflow-y-auto">
                    {activeContent === "color" && renderColorPicker()}
                    {activeContent === "template" && renderTemplatePicker()}
                    {activeContent === "language" && renderLanguageSelector()}
                    {activeContent === "reference" && renderReferencePicker()}
                    {!activeContent && (
                        <div className="space-y-1">
                            {navItems.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={item.active ? "default" : "ghost"}
                                    className={`w-full flex items-center gap-2 justify-start ${item.highlight ? "bg-red-600 hover:bg-red-700 text-white" : ""} ${item.active ? "bg-blue-500 hover:bg-blue-600 text-white" : ""}`}
                                    onClick={() => handleNavClick(item.contentType)}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
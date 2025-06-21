import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, ChevronDown } from "lucide-react"

export default function RightSidebar() {
    const [activeSidebarTab, setActiveSidebarTab] = useState("tips")
    const [expandedTip, setExpandedTip] = useState<number | null>(null)
    const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([])
    const [chatInput, setChatInput] = useState("")

    const tips = [
        {
            title: "Sử dụng ảnh đại diện nào?",
            content:
                "Hình trên CV nên thể hiện sự chuyên nghiệp, tôn trọng nhà tuyển dụng. Tuy nhiên như thế nào là chuyên nghiệp còn tùy mỗi ngành nghề.",
        },
        {
            title: "Sử dụng ảnh đại diện nào?",
            content:
                "Hình trên CV nên thể hiện sự chuyên nghiệp, tôn trọng nhà tuyển dụng. Tuy nhiên như thế nào là chuyên nghiệp còn tùy mỗi ngành nghề.",
        },
        {
            title: "Sử dụng ảnh đại diện nào?",
            content:
                "Hình trên CV nên thể hiện sự chuyên nghiệp, tôn trọng nhà tuyển dụng. Tuy nhiên như thế nào là chuyên nghiệp còn tùy mỗi ngành nghề.",
        },
        {
            title: "Sử dụng ảnh đại diện nào?",
            content:
                "Hình trên CV nên thể hiện sự chuyên nghiệp, tôn trọng nhà tuyển dụng. Tuy nhiên như thế nào là chuyên nghiệp còn tùy mỗi ngành nghề.",
        },
        {
            title: "Sử dụng ảnh đại diện nào?",
            content:
                "Hình trên CV nên thể hiện sự chuyên nghiệp, tôn trọng nhà tuyển dụng. Tuy nhiên như thế nào là chuyên nghiệp còn tùy mỗi ngành nghề.",
        },
    ]

    const handleChatSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (chatInput.trim()) {
            setChatMessages([...chatMessages, { sender: "user", message: chatInput }])
            setChatInput("")
            setTimeout(() => {
                setChatMessages((prev) => [
                    ...prev,
                    { sender: "ai", message: "Đây là phản hồi tự động từ AI Chatbox!" },
                ])
            }, 1000)
        }
    }

    return (
        <div className="w-100 fixed right-0 top-[105px] bottom-0 z-10">
            <Card className="h-full flex flex-col py-0 rounded">
                <CardHeader className="bg-blue-500 text-white p-4">
                    <div className="flex gap-2">
                        <Button
                            variant={activeSidebarTab === "tips" ? "default" : "ghost"}
                            className={`flex-1 ${activeSidebarTab === "tips" ? "bg-white text-blue-500" : "text-white"}`}
                            onClick={() => setActiveSidebarTab("tips")}
                        >
                            Tips
                        </Button>
                        <Button
                            variant={activeSidebarTab === "chat" ? "default" : "ghost"}
                            className={`flex-1 ${activeSidebarTab === "chat" ? "bg-white text-blue-500" : "text-white"}`}
                            onClick={() => setActiveSidebarTab("chat")}
                        >
                            AI Chatbox
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-y-auto">
                    {activeSidebarTab === "tips" ? (
                        <div>
                            {tips.map((tip, index) => (
                                <div key={index} className="border-b border-gray-200 last:border-b-0">
                                    <button
                                        onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                                        className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
                                    >
                                        <span className="font-medium text-sm">{tip.title}</span>
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform ${expandedTip === index ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                    {expandedTip === index && (
                                        <div className="px-4 pb-4">
                                            <p className="text-sm text-gray-600 mb-3">{tip.content}</p>
                                            <Button variant="link" className="text-blue-500 p-0 h-auto text-sm">
                                                Xem thêm
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col">
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {chatMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-2 rounded-lg ${
                                                msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                                            }`}
                                        >
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-200">
                                <form onSubmit={handleChatSubmit}>
                                    <Input
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="Nhập tin nhắn..."
                                        className="w-full"
                                    />
                                </form>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
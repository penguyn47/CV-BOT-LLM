"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Loader2, Bot, User, Lightbulb, Sparkles } from "lucide-react"
import { useAI } from "../hooks/useAI"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RightSidebarProps {
  cvData?: any
  selectedSection?: string | null
  onSectionClick?: (section: string) => void
}

export default function RightSidebar({ cvData, selectedSection, onSectionClick }: RightSidebarProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState("tips")
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([])
  const [chatInput, setChatInput] = useState("")
  const [currentTip, setCurrentTip] = useState<string>("")
  const [availableSections, setAvailableSections] = useState<string[]>([])
  const [selectedTipSection, setSelectedTipSection] = useState<string | null>(null)
  
  const { generateTip, sendChatMessage, extractSections, isLoading } = useAI()

  useEffect(() => {
    if (cvData) {
      extractSections(cvData).then(info => setAvailableSections(info.sections));
    }
  }, [cvData, extractSections])

  const handleGenerateTip = useCallback(async (section: string) => {
    if (!cvData) return;
    setSelectedTipSection(section);
    setCurrentTip(""); 
    const tip = await generateTip(section, cvData);
    setCurrentTip(tip);
  }, [cvData, generateTip]);

  useEffect(() => {
    if (selectedSection && activeSidebarTab === "tips") {
      handleGenerateTip(selectedSection);
    }
  }, [selectedSection, activeSidebarTab, handleGenerateTip]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim() && !isLoading) {
      const userMessage = chatInput.trim()
      const newMessages = [...chatMessages, { sender: "user", message: userMessage }]
      setChatMessages(newMessages)
      setChatInput("")
      const aiResponse = await sendChatMessage(userMessage, newMessages, cvData)
      setChatMessages((prev) => [...prev, { sender: "ai", message: aiResponse }])
    }
  }

  return (
    <div className="w-100 fixed right-0 top-[105px] bottom-0 z-10">
      <Card className="h-full flex flex-col py-0 rounded">
        <CardHeader className="bg-blue-500 text-white p-4">
          <div className="flex gap-2">
            <Button variant={activeSidebarTab === "tips" ? "default" : "ghost"} className={`flex-1 ${activeSidebarTab === "tips" ? "bg-white text-blue-500" : "text-white"}`} onClick={() => setActiveSidebarTab("tips")}>
              <Lightbulb className="h-4 w-4 mr-1" /> Tips
            </Button>
            <Button variant={activeSidebarTab === "chat" ? "default" : "ghost"} className={`flex-1 ${activeSidebarTab === "chat" ? "bg-white text-blue-500" : "text-white"}`} onClick={() => setActiveSidebarTab("chat")}>
              <Bot className="h-4 w-4 mr-1" /> AI Chatbox
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-y-auto">
          {activeSidebarTab === "tips" ? (
            <div>
              {/* PHẦN GỢI Ý AI ĐỘNG - ĐÃ HOẠT ĐỘNG ĐÚNG */}
              {selectedTipSection && (
                <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3"><Sparkles className="h-5 w-5 text-purple-500" /><h3 className="font-semibold text-purple-700">AI Gợi ý cho: {selectedTipSection}</h3></div>
                    {isLoading && !currentTip ? (
                      <div className="flex items-center gap-2 text-gray-500 py-4"><Loader2 className="h-4 w-4 animate-spin" /><span className="text-sm">Đang tạo gợi ý AI...</span></div>
                    ) : currentTip ? (
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded-lg border-l-4 border-purple-400 shadow-sm">
                            <div className="markdown-content force-wrap text-sm text-gray-700">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {currentTip}
                                </ReactMarkdown>
                            </div>
                        </div>
                        <div className="flex gap-2"><Button onClick={() => handleGenerateTip(selectedTipSection!)} disabled={isLoading} variant="outline" size="sm" className="text-purple-600 border-purple-300 hover:bg-purple-50">{isLoading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Sparkles className="mr-2 h-3 w-3" />}Tạo gợi ý khác</Button></div>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              {availableSections.length > 0 && (
                <div className="border-b border-gray-200 bg-blue-50"><div className="p-4"><h3 className="font-medium text-blue-700 mb-3 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Chọn mục để nhận gợi ý AI</h3><div className="flex flex-wrap gap-2">{availableSections.map((section, index) => (<Button key={index} variant="outline" size="sm" className={`text-xs ${selectedTipSection === section ? "bg-blue-100 border-blue-400" : "hover:bg-blue-100"}`} onClick={() => { onSectionClick?.(section); }}>{section}</Button>))}</div></div></div>
              )}
            </div>
          ) : (
            // PHẦN AI CHATBOX
            <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                            <Bot className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">Xin chào! Tôi có thể giúp bạn tư vấn về CV.</p>
                        </div>
                    )}
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.sender === "ai" && (<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><Bot className="h-4 w-4 text-blue-600" /></div>)}
                            
                            <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                                {msg.sender === 'ai' ? (
                                    <div className="markdown-content force-wrap text-sm">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.message}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <p className="text-sm">{msg.message}</p>
                                )}
                            </div>

                            {msg.sender === "user" && (<div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><User className="h-4 w-4 text-gray-600" /></div>)}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0"><Bot className="h-4 w-4 text-blue-600" /></div>
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /><span className="text-sm text-gray-600">Đang suy nghĩ...</span></div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                        <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Nhập câu hỏi của bạn..." className="flex-1" disabled={isLoading} />
                        <Button type="submit" disabled={!chatInput.trim() || isLoading} size="sm" className="px-3">
                            <MessageCircle className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import { useState } from "react"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface SectionInfo {
  sections: string[]
  totalSections: number
}

// Cấu hình base URL cho Express backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export function useAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([])

  const generateTip = async (section: string): Promise<string> => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/tips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ section }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate tip")
      }

      const data = await response.json()
      return data.tip
    } catch (error) {
      console.error("Error generating tip:", error)
      return "Không thể tạo gợi ý lúc này. Vui lòng thử lại sau."
    } finally {
      setIsLoading(false)
    }
  }

  const extractSections = async (cvData: any): Promise<SectionInfo> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvData }),
      })

      if (!response.ok) {
        throw new Error("Failed to extract sections")
      }

      return await response.json()
    } catch (error) {
      console.error("Error extracting sections:", error)
      return { sections: [], totalSections: 0 }
    }
  }

  const sendChatMessage = async (message: string): Promise<string> => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send chat message")
      }

      const data = await response.json()
      setConversationHistory(data.conversationHistory)
      return data.reply
    } catch (error) {
      console.error("Error sending chat message:", error)
      return "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này."
    } finally {
      setIsLoading(false)
    }
  }

  const clearConversation = () => {
    setConversationHistory([])
  }

  return {
    generateTip,
    extractSections,
    sendChatMessage,
    clearConversation,
    isLoading,
    conversationHistory,
  }
}
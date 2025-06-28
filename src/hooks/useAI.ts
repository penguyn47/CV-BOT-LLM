"use client"

import { useState, useCallback } from "react";

type CohereChatHistory = {
    role: "USER" | "CHATBOT";
    message: string;
};

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const API_BASE_URL = "http://localhost:3000/api/ai";

  // BỎ COMMENT API THẬT
  const generateTip = useCallback(async (sectionName: string, cvData: any): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/generate-tip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionName, cvData }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Lỗi mạng hoặc server");
      }
      const data = await response.json();
      return data.tip || "Không thể nhận được gợi ý lúc này.";
    } catch (error: any) {
      console.error("Lỗi khi tạo tip:", error);
      return `Đã có lỗi xảy ra: ${error.message}`;
    } finally {
      setIsLoading(false);
    }
  }, []); // Dependency rỗng vì hàm này không phụ thuộc vào state/props bên trong hook

  const sendChatMessage = useCallback(async (
    message: string, 
    chatHistory: { sender: string; message: string }[],
    cvData: any
  ): Promise<string> => {
      setIsLoading(true);
      const cohereHistory: CohereChatHistory[] = chatHistory.map(msg => ({
          role: msg.sender === 'user' ? 'USER' : 'CHATBOT',
          message: msg.message
      }));
      try {
          const response = await fetch(`${API_BASE_URL}/chat`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message, chatHistory: cohereHistory, cvData }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Lỗi mạng hoặc server");
          }
          const data = await response.json();
          return data.reply || "Tôi chưa thể trả lời câu hỏi này.";
      } catch (error: any) {
          console.error("Lỗi khi gửi tin nhắn chat:", error);
          return `Đã có lỗi xảy ra: ${error.message}`;
      } finally {
          setIsLoading(false);
      }
  }, []); // Dependency rỗng

   const extractSections = useCallback(async (cvData: any): Promise<{ sections: string[] }> => {
        const sections = Object.values(cvData)
            .filter((value: any): value is { title: string } => value && typeof value === 'object' && 'title' in value)
            .map((value) => value.title);
        
        sections.unshift("Thông tin liên hệ");
        return { sections };
    }, []);

  return { isLoading, generateTip, sendChatMessage, extractSections };
};
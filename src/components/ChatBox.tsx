'use client'

import { useState, useRef, useEffect } from 'react'
import { Resume } from '@/lib/types'

interface Message {
	id: string
	content: string
	isUser: boolean
	timestamp: Date
}

interface ChatBoxProps {
	resumeData: Resume | null
	onClose?: () => void
	chatType?: 'education' | 'experience' | 'skills' | 'summary'
}

export default function ChatBox({ resumeData, onClose, chatType = 'education' }: ChatBoxProps) {
	const getInitialMessage = () => {
		switch (chatType) {
			case 'education':
				return 'Bạn có hỏi đáp gì về học vấn không?'
			case 'experience':
				return 'Bạn có hỏi đáp gì về kinh nghiệm làm việc không?'
			case 'skills':
				return 'Bạn có hỏi đáp gì về kỹ năng không?'
			case 'summary':
				return 'Bạn có hỏi đáp gì về tổng quan CV không?'
			default:
				return 'Bạn có hỏi đáp gì không?'
		}
	}

	const getChatTitle = () => {
		switch (chatType) {
			case 'education':
				return 'Chat AI - Học vấn'
			case 'experience':
				return 'Chat AI - Kinh nghiệm'
			case 'skills':
				return 'Chat AI - Kỹ năng'
			case 'summary':
				return 'Chat AI - Tổng quan'
			default:
				return 'Chat AI'
		}
	}

	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			content: getInitialMessage(),
			isUser: false,
			timestamp: new Date(),
		},
	])
	const [inputMessage, setInputMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSendMessage = async () => {
		if (!inputMessage.trim() || !resumeData) return

		const userMessage: Message = {
			id: Date.now().toString(),
			content: inputMessage,
			isUser: true,
			timestamp: new Date(),
		}

		setMessages((prev) => [...prev, userMessage])
		setInputMessage('')
		setIsLoading(true)

		try {
			const response = await fetch(`/api/chat/${chatType}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: inputMessage,
					resumeData: { ...resumeData, photoData: '' },
				}),
			})

			if (response.ok) {
				const data = await response.json()
				const aiMessage: Message = {
					id: (Date.now() + 1).toString(),
					content: data.response,
					isUser: false,
					timestamp: new Date(),
				}
				setMessages((prev) => [...prev, aiMessage])
			} else {
				const errorMessage: Message = {
					id: (Date.now() + 1).toString(),
					content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
					isUser: false,
					timestamp: new Date(),
				}
				setMessages((prev) => [...prev, errorMessage])
			}
		} catch (error) {
			console.error('Error sending message:', error)
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
				isUser: false,
				timestamp: new Date(),
			}
			setMessages((prev) => [...prev, errorMessage])
		} finally {
			setIsLoading(false)
		}
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<div className="fixed bottom-4 right-4 z-50 w-80 rounded-lg border bg-white shadow-lg">
			{/* Header */}
			<div className="flex items-center justify-between rounded-t-lg bg-gray-800 px-4 py-3">
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded-full bg-green-400"></div>
					<span className="font-medium text-white">{getChatTitle()}</span>
				</div>
				{onClose && (
					<button
						onClick={onClose}
						className="text-gray-300 hover:text-white"
					>
						✕
					</button>
				)}
			</div>

			{/* Messages */}
			<div className="h-80 overflow-y-auto p-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`mb-3 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-xs rounded-lg px-3 py-2 ${
								message.isUser
									? 'bg-blue-500 text-white'
									: 'bg-gray-100 text-gray-800'
							}`}
						>
							<div className="text-sm whitespace-pre-wrap">{message.content}</div>
							<p className="mt-1 text-xs opacity-70">
								{message.timestamp.toLocaleTimeString('vi-VN', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</div>
				))}
				{isLoading && (
					<div className="flex justify-start">
						<div className="rounded-lg bg-gray-100 px-3 py-2">
							<div className="flex items-center gap-1">
								<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
								<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.1s' }}></div>
								<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }}></div>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<div className="border-t p-4">
				<div className="flex gap-2">
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Nhập tin nhắn..."
						className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
						disabled={isLoading}
					/>
					<button
						onClick={handleSendMessage}
						disabled={!inputMessage.trim() || isLoading}
						className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
					>
						Gửi
					</button>
				</div>
			</div>
		</div>
	)
} 
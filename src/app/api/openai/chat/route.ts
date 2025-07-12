// app/api/openai/chat/route.ts
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
	try {
		const { message, resumeData } = await req.json()

		const prompt = `
Dưới đây là nội dung của một hồ sơ xin việc:

${JSON.stringify(resumeData, null, 2)}

Câu hỏi: ${message}
Vui lòng trả lời dựa trên nội dung hồ sơ ở trên.
`

		if (!message) {
			return NextResponse.json({ error: 'Thiếu nội dung tin nhắn' }, { status: 400 })
		}

		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'Bạn là một trợ lý AI chuyên phân tích hồ sơ xin việc.' },
				{ role: 'user', content: prompt },
			],
		})

		const reply = completion.choices[0].message.content
		return NextResponse.json({ reply })
	} catch (error) {
		console.error('Lỗi GPT:', error)
		return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
	}
}

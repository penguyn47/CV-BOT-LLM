import { NextRequest, NextResponse } from 'next/server'
import { Resume } from '@/lib/types'

export async function POST(request: NextRequest) {
	try {
		const { message, resumeData } = await request.json()

		if (!message || !resumeData) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 }
			)
		}

		// Tạo prompt cho AI với thông tin CV và focus vào kinh nghiệm
		const experienceInfo = resumeData.workExperiences?.map((exp: any) => `
- Công ty: ${exp.company}
- Vị trí: ${exp.position}
- Thời gian: ${exp.startDate} - ${exp.endDate || 'Hiện tại'}
- Mô tả: ${exp.description}
		`).join('\n') || 'Chưa có kinh nghiệm làm việc'

		const prompt = `Bạn là một chuyên gia tư vấn về CV và kinh nghiệm làm việc. Dưới đây là thông tin CV hiện tại của ứng viên:

THÔNG TIN CÁ NHÂN:
- Họ tên: ${resumeData.firstName || ''} ${resumeData.lastName || ''}
- Vị trí công việc: ${resumeData.jobTitle || 'Không có'}
- Thành phố: ${resumeData.city || 'Không có'}
- Quốc gia: ${resumeData.country || 'Không có'}
- Email: ${resumeData.email || 'Không có'}
- Điện thoại: ${resumeData.phone || 'Không có'}

TÓM TẮT: ${resumeData.summary || 'Không có'}

HỌC VẤN:
${resumeData.educations?.map((edu: any) => `
- Trường: ${edu.institution}
- Bằng cấp: ${edu.degree}
- Ngành học: ${edu.fieldOfStudy || 'Không có'}
- Thành phố: ${edu.city || 'Không có'}
- Thời gian: ${edu.startDate} - ${edu.endDate || 'Hiện tại'}
`).join('\n') || 'Chưa có thông tin học vấn'}

KỸ NĂNG: ${resumeData.skills?.join(', ') || 'Chưa có kỹ năng'}

KINH NGHIỆM LÀM VIỆC:
${experienceInfo}

Hãy trả lời câu hỏi của người dùng về kinh nghiệm làm việc một cách chuyên nghiệp và hữu ích. Tập trung vào việc tư vấn về cách cải thiện phần kinh nghiệm làm việc trong CV. Trả lời bằng tiếng Việt và sử dụng xuống dòng để dễ đọc.

Câu hỏi của người dùng: ${message}`

		// Gọi OpenAI API
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [
					{
						role: 'system',
						content: 'Bạn là một chuyên gia tư vấn CV chuyên về phần kinh nghiệm làm việc. Hãy trả lời bằng tiếng Việt một cách chuyên nghiệp và hữu ích. Sử dụng xuống dòng để tách các ý chính và làm cho câu trả lời dễ đọc hơn.',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
				max_tokens: 1000,
				temperature: 0.7,
			}),
		})

		if (!response.ok) {
			throw new Error('OpenAI API request failed')
		}

		const data = await response.json()
		const aiResponse = data.choices[0]?.message?.content || 'Xin lỗi, tôi không thể trả lời câu hỏi này.'

		return NextResponse.json({ response: aiResponse })
	} catch (error) {
		console.error('Error in experience chat API:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
} 
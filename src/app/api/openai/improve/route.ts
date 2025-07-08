import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ResumeService } from '@/lib/ResumeService'
import { Resume, WorkExperience, Education } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// Định nghĩa interface cho Hint
interface Hint {
	type: 'success' | 'notice'
	part: 'generalInfo' | 'experience' | 'education' | 'skills' | 'summary'
	content: string
}

// Định nghĩa interface cho request body
interface RequestBody {
	hint: Hint
	resumeData: Resume
}

// Khởi tạo OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// Khởi tạo ResumeService
const resumeService = new ResumeService()

// Hàm xử lý POST request
export async function POST(request: Request): Promise<NextResponse> {
	try {
		// Lấy dữ liệu từ request body
		const { hint, resumeData }: RequestBody = await request.json()

		// Kiểm tra xem hint và resumeData có được cung cấp không
		if (!hint || !resumeData) {
			return NextResponse.json({ error: 'Vui lòng cung cấp hint và resumeData' }, { status: 400 })
		}

		// Kiểm tra resume tồn tại trong ResumeService
		const existingResume = await resumeService.getResumeById(resumeData.id)
		if (!existingResume) {
			return NextResponse.json({ error: 'Không tìm thấy resume với ID cung cấp' }, { status: 404 })
		}

		// Tạo prompt cho OpenAI để tối ưu hóa nội dung dựa trên hint.part
		const prompt = `
            Bạn là một chuyên gia tối ưu hóa hồ sơ ứng tuyển bằng tiếng Việt. Nhiệm vụ của bạn là sử dụng thông tin từ gợi ý (hint) và hồ sơ (resumeData) để tạo nội dung mới hoặc cải thiện nội dung cho phần "${hint.part}" của hồ sơ. Nội dung mới phải:
            - Phù hợp với phần "${hint.part}" (generalInfo, experience, education, skills, hoặc summary).
            - Dựa trên gợi ý: "${hint.content}".
            - Mang tính chuyên nghiệp, ngắn gọn và phù hợp với hồ sơ ứng tuyển.
            - Nếu là "generalInfo", tạo ra các giá trị cho firstName, lastName, jobTitle, city, country, phone, email (nếu phù hợp).
            - Nếu là "experience", tạo hoặc cập nhật mô tả cho một kinh nghiệm làm việc với các trường company, position, description, startDate, endDate (nếu phù hợp).
            - Nếu là "education", tạo hoặc cập nhật thông tin học vấn với các trường institution, degree, fieldOfStudy, startDate, endDate (nếu phù hợp).
            - Nếu là "skills", trả về một mảng các kỹ năng (array of strings), bao gồm các kỹ năng mới hoặc cải thiện từ hint.content và resumeData.skills.
            - Nếu là "summary", tạo một đoạn tóm tắt ngắn gọn, chuyên nghiệp.

            **Gợi ý (hint)**:
            ${JSON.stringify(hint, null, 2)}

            **Hồ sơ hiện tại (resumeData)**:
            ${JSON.stringify(resumeData, null, 2)}

            Trả về kết quả theo định dạng JSON:
            {
                "updatedContent": {
                    // Nội dung cập nhật cho phần tương ứng, ví dụ:
                    // - generalInfo: { firstName: "...", lastName: "...", ... }
                    // - experience: { company: "...", position: "...", description: "...", startDate: "...", endDate: "..." }
                    // - education: { institution: "...", degree: "...", fieldOfStudy: "...", startDate: "...", endDate: "..." }
                    // - skills: ["kỹ năng 1", "kỹ năng 2", ...]
                    // - summary: "Nội dung tóm tắt"
                }
            }
        `

		// Gửi yêu cầu đến OpenAI
		const completion = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{ role: 'system', content: 'Bạn là một chuyên gia tối ưu hóa hồ sơ ứng tuyển.' },
				{ role: 'user', content: prompt },
			],
			response_format: { type: 'json_object' },
		})

		// Lấy kết quả từ OpenAI
		const content = completion.choices[0]?.message.content
		if (!content) {
			return NextResponse.json({ error: 'Không nhận được nội dung từ OpenAI' }, { status: 500 })
		}

		// Parse JSON an toàn
		let updatedContent: any
		try {
			updatedContent = JSON.parse(content).updatedContent
			if (!updatedContent) {
				throw new Error('Không tìm thấy updatedContent trong kết quả OpenAI')
			}
		} catch (parseError) {
			console.error('Lỗi khi parse JSON:', parseError)
			console.error('Nội dung từ OpenAI:', content)
			return NextResponse.json({ error: 'Dữ liệu từ OpenAI không đúng định dạng' }, { status: 500 })
		}

		// Log để debug
		console.log('Nội dung từ OpenAI (updatedContent):', updatedContent)

		// Cập nhật resumeData dựa trên hint.part và nội dung từ OpenAI
		let updatedResumeData = { ...resumeData } as Resume

		switch (hint.part) {
			case 'generalInfo':
				updatedResumeData = {
					...updatedResumeData,
					firstName: updatedContent.generalInfo.firstName || updatedResumeData.firstName,
					lastName: updatedContent.generalInfo.lastName || updatedResumeData.lastName,
					jobTitle: updatedContent.generalInfo.jobTitle || updatedResumeData.jobTitle,
					city: updatedContent.generalInfo.city || updatedResumeData.city,
					country: updatedContent.generalInfo.country || updatedResumeData.country,
					phone: updatedContent.generalInfo.phone || updatedResumeData.phone,
					email: updatedContent.generalInfo.email || updatedResumeData.email,
				}
				break
			case 'experience':
				updatedResumeData.workExperiences =
					updatedResumeData.workExperiences.length > 0
						? updatedResumeData.workExperiences.map((exp, index) =>
								index === 0 ? { ...exp, ...updatedContent.experience, id: exp.id } : exp,
							)
						: [{ ...updatedContent.experience, id: uuidv4() }]
				break
			case 'education':
				updatedResumeData.educations =
					updatedResumeData.educations.length > 0
						? updatedResumeData.educations.map((edu, index) =>
								index === 0 ? { ...edu, ...updatedContent.education, id: edu.id } : edu,
							)
						: [{ ...updatedContent.education, id: uuidv4() }]
				break
			case 'skills':
				updatedResumeData.skills = Array.isArray(updatedContent.skills)
					? [...new Set([...updatedResumeData.skills, ...updatedContent.skills])]
					: [...new Set([...updatedResumeData.skills, hint.content])]
				break
			case 'summary':
				updatedResumeData.summary = updatedContent.summary || hint.content
				break
			default:
				return NextResponse.json({ error: 'Phần không hợp lệ trong hint' }, { status: 400 })
		}

		// Cập nhật thời gian updatedAt
		updatedResumeData.updatedAt = new Date().toISOString()

		// Lưu resumeData đã cập nhật vào ResumeService
		const savedResume = await resumeService.updateResume(resumeData.id, updatedResumeData)
		if (!savedResume) {
			return NextResponse.json({ error: 'Không thể lưu resume đã cập nhật' }, { status: 500 })
		}

		// Trả về resumeData đã được cập nhật
		return NextResponse.json(
			{
				message: 'Cập nhật resume thành công',
				resumeData: savedResume,
			},
			{ status: 200 },
		)
	} catch (error: unknown) {
		console.error('Lỗi khi xử lý yêu cầu:', error)
		return NextResponse.json({ error: 'Lỗi server nội bộ' }, { status: 500 })
	}
}

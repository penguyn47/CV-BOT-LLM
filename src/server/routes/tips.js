const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()
require("dotenv").config()

const COHERE_API_KEY = process.COHERE_API_KEY

function getProfileData() {
  try {
    const profilePath = path.join(process.cwd(), "db", "profile.json")
    const profileData = fs.readFileSync(profilePath, "utf8")
    return JSON.parse(profileData)
  } catch (error) {
    console.error("Error reading profile data:", error)
    throw new Error("Could not load profile data")
  }
}

// Generic section categories mapping
const sectionCategories = {
  // Career objective variations
  "mục tiêu nghề nghiệp": "career_objective",
  "mục tiêu": "career_objective",
  objective: "career_objective",
  "career objective": "career_objective",
  "tóm tắt": "career_objective",
  summary: "career_objective",

  // Skills variations
  "lĩnh vực chuyên môn": "skills",
  "kỹ năng": "skills",
  skills: "skills",
  "kỹ năng chuyên môn": "skills",
  "technical skills": "skills",
  "chuyên môn": "skills",

  // Soft skills
  "kỹ năng khác": "soft_skills",
  "kỹ năng mềm": "soft_skills",
  "soft skills": "soft_skills",
  "other skills": "soft_skills",

  // Experience variations
  "kinh nghiệm làm việc": "experience",
  "kinh nghiệm": "experience",
  experience: "experience",
  "work experience": "experience",
  "professional experience": "experience",

  // Education variations
  "lịch sử học vấn": "education",
  "học vấn": "education",
  education: "education",
  "trình độ học vấn": "education",

  // Certificates
  "chứng chỉ": "certificates",
  certificates: "certificates",
  certifications: "certificates",
  "bằng cấp": "certificates",

  // Hobbies
  "sở thích": "hobbies",
  hobbies: "hobbies",
  interests: "hobbies",

  // Projects
  "dự án": "projects",
  projects: "projects",
  "personal projects": "projects",

  // Awards
  "giải thưởng": "awards",
  awards: "awards",
  achievements: "awards",
  "thành tích": "awards",

  // References
  "người tham chiếu": "references",
  references: "references",
  "tham khảo": "references",

  // Languages
  "ngôn ngữ": "languages",
  languages: "languages",
  "foreign languages": "languages",

  // Contact
  "thông tin liên hệ": "contact",
  contact: "contact",
  "liên hệ": "contact",
}

const genericTipPrompts = {
  career_objective: `Hãy đưa ra 3-5 gợi ý cụ thể để viết mục tiêu nghề nghiệp hiệu quả cho vị trí này. 
    Tập trung vào việc kết hợp vị trí mong muốn, kỹ năng hiện có và mục tiêu phát triển.`,

  skills: `Dựa trên thông tin kỹ năng và vị trí ứng tuyển, hãy đưa ra gợi ý về cách trình bày 
    kỹ năng chuyên môn một cách ấn tượng và phù hợp.`,

  soft_skills: `Hãy gợi ý các kỹ năng mềm quan trọng cho vị trí này và 
    cách diễn đạt chúng một cách chuyên nghiệp.`,

  experience: `Đưa ra gợi ý về cách trình bày kinh nghiệm làm việc hiệu quả, 
    bao gồm cách viết mô tả công việc, thành tích và kết quả đạt được.`,

  education: `Hãy gợi ý cách trình bày học vấn một cách chuyên nghiệp, 
    bao gồm thông tin nào nên đưa vào và cách sắp xếp.`,

  certificates: `Đưa ra gợi ý về các chứng chỉ quan trọng cho vị trí này và 
    cách trình bày chúng để tạo ấn tượng tốt.`,

  hobbies: `Gợi ý cách chọn lọc và trình bày sở thích cá nhân sao cho 
    phù hợp với văn hóa công ty và vị trí ứng tuyển.`,

  projects: `Hãy gợi ý cách trình bày dự án cá nhân hoặc dự án đã tham gia 
    để thể hiện kỹ năng và kinh nghiệm thực tế.`,

  awards: `Đưa ra gợi ý về cách trình bày giải thưởng và thành tích 
    để tạo ấn tượng mạnh với nhà tuyển dụng.`,

  references: `Hãy gợi ý về việc chuẩn bị và trình bày thông tin người tham chiếu 
    một cách chuyên nghiệp và phù hợp.`,

  languages: `Gợi ý cách trình bày khả năng ngoại ngữ theo tiêu chuẩn quốc tế 
    và phù hợp với yêu cầu công việc.`,

  contact: `Đưa ra gợi ý về cách trình bày thông tin liên hệ một cách 
    chuyên nghiệp và đầy đủ.`,

  default: `Hãy đưa ra gợi ý chung về cách trình bày mục này trong CV 
    sao cho chuyên nghiệp và phù hợp với vị trí ứng tuyển.`,
}

function getSectionCategory(sectionName) {
  const normalizedName = sectionName.toLowerCase().trim()
  return sectionCategories[normalizedName] || "default"
}

// POST /api/tips
router.post("/", async (req, res) => {
  try {
    const { section } = req.body

    if (!section) {
      return res.status(400).json({ error: "Section name is required" })
    }

    const profileData = getProfileData()
    const sectionCategory = getSectionCategory(section)
    const basePrompt = genericTipPrompts[sectionCategory]

    const prompt = `${basePrompt}

Mục CV hiện tại: "${section}"

Thông tin profile hiện tại:
- Tên: ${profileData.profile.name}
- Vị trí mong muốn: ${profileData.target_job.position}
- Cấp độ: ${profileData.target_job.level}
- Lĩnh vực: ${profileData.target_job.job}
- Công ty mục tiêu: ${profileData.target_company.name} (${profileData.target_company.type})
- Kỹ năng: ${profileData.skill.name.join(", ")}
- Học vấn: ${profileData.skill.education}

Hãy trả lời bằng tiếng Việt, ngắn gọn và thực tế. Đưa ra 3-5 gợi ý cụ thể.`

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: prompt,
        max_tokens: 300,
        temperature: 0.7,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      }),
    })

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`)
    }

    const data = await response.json()
    const tip = data.generations[0]?.text?.trim() || "Không thể tạo gợi ý lúc này."

    res.json({
      tip,
      section,
      category: sectionCategory,
    })
  } catch (error) {
    console.error("Error generating tip:", error)
    res.status(500).json({ error: "Failed to generate tip" })
  }
})

module.exports = router
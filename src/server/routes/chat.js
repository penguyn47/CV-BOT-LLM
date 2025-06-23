const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()
require("dotenv").config();

const COHERE_API_KEY = process.COHERE_API_KEY;

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

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: "Message is required" })
    }

    const profileData = getProfileData()

    // Create context from profile data
    const profileContext = `
Thông tin cá nhân của người dùng:
- Họ tên: ${profileData.profile.name}
- Email: ${profileData.profile.email}
- Điện thoại: ${profileData.profile.phone}
- Địa chỉ: ${profileData.profile.address}
- Tóm tắt: ${profileData.profile.summary}

Mục tiêu nghề nghiệp:
- Vị trí: ${profileData.target_job.position}
- Cấp độ: ${profileData.target_job.level}
- Lĩnh vực: ${profileData.target_job.job}
- Mô tả: ${profileData.target_job.description}

Công ty mục tiêu:
- Tên: ${profileData.target_company.name}
- Quy mô: ${profileData.target_company.scale}
- Loại hình: ${profileData.target_company.type}
- Mô tả: ${profileData.target_company.description}
- Giá trị: ${profileData.target_company.value}

Kỹ năng:
- Kỹ năng chính: ${profileData.skill.name.join(", ")}
- Kinh nghiệm: ${profileData.skill.experience}
- Học vấn: ${profileData.skill.education}
`

    // Build conversation context
    let conversationContext = ""
    if (conversationHistory.length > 0) {
      conversationContext = "\n\nLịch sử cuộc trò chuyện:\n"
      conversationHistory.forEach((msg) => {
        conversationContext += `${msg.role === "user" ? "Người dùng" : "Trợ lý"}: ${msg.content}\n`
      })
    }

    const systemPrompt = `Bạn là một trợ lý AI chuyên về tư vấn CV và nghề nghiệp. 
Hãy trả lời câu hỏi của người dùng dựa trên thông tin profile của họ.
Trả lời bằng tiếng Việt, thân thiện và hữu ích.

${profileContext}${conversationContext}

Câu hỏi của người dùng: ${message}

Trả lời:`

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: systemPrompt,
        max_tokens: 500,
        temperature: 0.8,
        k: 0,
        stop_sequences: [],
        return_likelihoods: "NONE",
      }),
    })

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.status}`)
    }

    const data = await response.json()
    const reply = data.generations[0]?.text?.trim() || "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này."

    res.json({
      reply,
      conversationHistory: [
        ...conversationHistory,
        { role: "user", content: message },
        { role: "assistant", content: reply },
      ],
    })
  } catch (error) {
    console.error("Error in chat:", error)
    res.status(500).json({ error: "Failed to process chat message" })
  }
})

module.exports = router
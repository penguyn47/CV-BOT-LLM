// backend/controllers/aiController.js
const { CohereClient } = require("cohere-ai");
const profileData = require('../../db/profile.json');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Hàm tạo gợi ý cho một mục cụ thể
exports.generateTip = async (req, res) => {
  const { sectionName, cvData } = req.body;

  if (!sectionName || !cvData) {
    return res.status(400).json({ success: false, message: "Vui lòng cung cấp sectionName và cvData." });
  }

  // Lấy thông tin người dùng từ file JSON để làm phong phú context
  const userProfileContext = JSON.stringify(profileData, null, 2);

  const prompt = `
    Bạn là một chuyên gia tư vấn viết CV chuyên nghiệp tại Việt Nam.
    Nhiệm vụ của bạn là đưa ra lời khuyên để cải thiện một mục trong CV của người dùng.

    Bối cảnh:
    - Vị trí ứng tuyển: ${profileData.target_job.position}
    - Thông tin chung của ứng viên: ${userProfileContext}
    - Nội dung CV hiện tại của họ: ${JSON.stringify(cvData, null, 2)}
    
    Yêu cầu:
    1.  **Đi thẳng vào vấn đề**, không dùng câu chào hỏi hay giới thiệu.
    2.  Tập trung vào mục CV có tên là **"${sectionName}"**.
    3.  Trả lời bằng tiếng Việt, sử dụng định dạng Markdown.
    4.  Cấu trúc câu trả lời phải có **CHÍNH XÁC 2 PHẦN** như sau:

        ### GỢI Ý CHUNG
        - Đưa ra 2-3 gạch đầu dòng về các nguyên tắc chung, các lỗi cần tránh, hoặc các ý tưởng để viết mục "${sectionName}" này tốt hơn. Các gợi ý phải ngắn gọn, mang tính hành động.

        ### VÍ DỤ THAM KHẢO
        - Dựa vào vị trí ứng tuyển là "${profileData.target_job.position}", hãy viết một đoạn văn mẫu **hoàn chỉnh, sẵn sàng để sao chép** cho mục "${sectionName}". Nếu mục này đã có nội dung, hãy cải thiện nó. Nếu chưa có, hãy viết mới hoàn toàn.
  `;

  try {
    const response = await cohere.chat({
      message: prompt,
      // Có thể thêm các tham số khác như temperature, max_tokens,...
    });

    res.json({ success: true, tip: response.text });
  } catch (error) {
    console.error("Lỗi khi gọi Cohere API:", error);
    res.status(500).json({ success: false, message: "Không thể tạo gợi ý từ AI." });
  }
};

// Hàm xử lý chat
exports.getChatResponse = async (req, res) => {
    const { message, chatHistory, cvData } = req.body;

    if (!message) {
        return res.status(400).json({ success: false, message: "Vui lòng cung cấp nội dung tin nhắn." });
    }

    const preamble = `
        Bạn là AI Chatbot tư vấn CV tên là CV-Bot.
        Nhiệm vụ của bạn là giúp người dùng viết CV dựa trên mục tiêu thật của họ, dù cho nội dung mẫu trên màn hình có thể khác.

        --- BỐI CẢNH QUAN TRỌNG ---
        1.  **MỤC TIÊU THẬT SỰ CỦA ỨNG VIÊN (Thông tin quan trọng nhất):**
            - Tên: ${profileData.profile.name}
            - Vị trí ứng tuyển: ${profileData.target_job.position}

        2.  **NỘI DUNG MẪU TRÊN MÀN HÌNH (Dùng để tham khảo nếu cần, nhưng không phải là thông tin chính):**
            - Nội dung chi tiết: ${JSON.stringify(cvData)}
        
        --- QUY TẮC TRẢ LỜI ---
        - Luôn ưu tiên trả lời dựa trên "MỤC TIÊU THẬT SỰ".
        - Khi người dùng hỏi "tôi ứng tuyển vị trí gì?", hãy trả lời là "${profileData.target_job.position}" dựa trên hồ sơ.
        - Phân tích và đưa ra lời khuyên để giúp họ chỉnh sửa CV từ mẫu Marketing sang DevOps.
    `;

    try {
        const response = await cohere.chat({
            chatHistory: chatHistory || [],
            message: message,
            preamble: preamble,
        });
        res.json({ success: true, reply: response.text });
    } catch (error) {
        console.error("Lỗi khi gọi Cohere Chat API:", error);
        res.status(500).json({ success: false, message: "AI Chatbot đang gặp lỗi." });
    }
};
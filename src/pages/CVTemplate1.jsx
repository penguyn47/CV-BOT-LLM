import React from 'react';

// Ví dụ component CVTemplate: bạn có thể truyền data qua props hoặc load từ API
export default function CVTemplate1({ data }) {
  // Nếu không có data truyền vào, dùng dữ liệu mẫu
  const sampleData = {
    name: 'Trần Nguyễn Tâm Đan',
    title: 'Nhân Viên Kinh Doanh',
    photoUrl: 'https://i.pinimg.com/originals/bc/e2/dd/bce2dda345d034c2f86af133b2d09e92.jpg', // Thay đường dẫn ảnh thật hoặc truyền qua props
    contact: {
      phone: '0321456987',
      email: 'trannguyentamdan@gmail.com',
      birthday: '16/10/1998',
      location: 'Hà Nội',
    },
    skills: ['Quản Lý Điều Hành', 'Chăm Sóc Khách Hàng', 'AccNet', 'Adobe Illustrator'],
    languages: ['Tiếng Anh', 'Tiếng Pháp'],
    softSkills: ['Quản lý thời gian', 'Giải quyết vấn đề', 'Làm việc nhóm'],
    references: [
      {
        name: 'Trần Lê Nguyễn Vũ',
        title: 'Trưởng khoa CNTT - Đại học ...',
        phone: '0123456789',
        email: 'abc@gmail.com',
      },
    ],
    objective:
      'Xin chào nhà tuyển dụng! Tôi là Trần Nguyễn Tâm Đan, một nhân viên kinh doanh trẻ tuổi đầy đam mê và nhiệt huyết. Với những kiến thức tôi học được cùng với sự nhiệt huyết sáng tạo, kinh nghiệm cùng tinh thần trách nhiệm trong công việc, tôi hy vọng có thể đóng góp một phần nhỏ của mình vào sự phát triển của công ty.',
    experiences: [
      {
        position: 'Nhân Viên Kinh Doanh',
        company: 'Công Ty CP ...',
        period: '2022 - 2023',
        duties: [
          'Thực hiện các kế hoạch kinh doanh: tìm kiếm khách hàng, giới thiệu sản phẩm dịch vụ, tư vấn sản phẩm và ứng dụng, chăm sóc và quản lý quan hệ khách hàng.',
          'Lập kế hoạch hoạt động năm, quý, tháng, tuần để đạt được mục tiêu được giao.',
          'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến tại khu vực quản lý. Xây dựng, kiện nghị kế hoạch kinh doanh phù hợp.',
        ],
        achievements: [
          'Best seller 2022',
          'Nhân viên xuất sắc 2022',
          'Nhân viên sáng tạo',
          'Dự án sale xuất sắc',
        ],
      },
    ],
    education: [
      {
        degree: 'Quản Trị Kinh Doanh',
        school: 'Đại Học ...',
        period: '2022 - 2023',
        grade: 'Tốt nghiệp loại Giỏi',
      },
    ],
    hobbies: ['Thể thao'],
  };

  const cv = data || sampleData;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 flex flex-col md:flex-row font-sans">
      {/* Sidebar trái */}
      <aside className="md:w-1/3 border-r border-gray-300 pr-4 mb-6 md:mb-0">
        {/* Ảnh */}
        {cv.photoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={cv.photoUrl}
              alt={cv.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        {/* Tên và chức danh ngắn */}
        <h1 className="text-2xl font-bold text-center mb-2">{cv.name}</h1>
        <p className="text-center text-gray-600 mb-4">{cv.title}</p>
        {/* Thông tin liên hệ */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Thông tin</h2>
          <ul className="text-gray-700 text-sm space-y-1">
            {cv.contact.phone && <li>📞 {cv.contact.phone}</li>}
            {cv.contact.email && <li>✉️ {cv.contact.email}</li>}
            {cv.contact.birthday && <li>🎂 {cv.contact.birthday}</li>}
            {cv.contact.location && <li>📍 {cv.contact.location}</li>}
          </ul>
        </section>
        {/* Kỹ năng */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Kỹ năng</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {cv.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
        {/* Ngôn ngữ */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Ngôn ngữ</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {cv.languages.map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        </section>
        {/* Kỹ năng mềm */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Kỹ năng mềm</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            {cv.softSkills.map((soft, idx) => (
              <li key={idx}>{soft}</li>
            ))}
          </ul>
        </section>
        {/* Người tham chiếu */}
        <section>
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Người tham chiếu</h2>
          {cv.references.map((ref, idx) => (
            <div key={idx} className="text-gray-700 text-sm mb-3">
              <p className="font-medium">{ref.name}</p>
              {ref.title && <p className="italic">{ref.title}</p>}
              {ref.phone && <p>📞 {ref.phone}</p>}
              {ref.email && <p>✉️ {ref.email}</p>}
            </div>
          ))}
        </section>
      </aside>

      {/* Nội dung chính */}
      <main className="md:w-2/3 pl-0 md:pl-6">
        {/* Mục tiêu nghề nghiệp */}
        {cv.objective && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Mục tiêu nghề nghiệp</h2>
            <p className="text-gray-800 text-sm whitespace-pre-line">{cv.objective}</p>
          </section>
        )}
        {/* Kinh nghiệm làm việc */}
        {cv.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Kinh nghiệm làm việc</h2>
            {cv.experiences.map((exp, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-lg font-medium">{exp.position}</h3>
                <p className="text-gray-600 italic">{exp.company} | {exp.period}</p>
                <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                  {exp.duties.map((duty, i) => <li key={i}>{duty}</li>)}
                </ul>
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mt-2">
                    <p className="font-medium">Thành tích:</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm">
                      {exp.achievements.map((ach, j) => <li key={j}>{ach}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}
        {/* Học vấn */}
        {cv.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Học vấn</h2>
            {cv.education.map((edu, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="text-lg font-medium">{edu.degree}</h3>
                <p className="text-gray-600 italic">{edu.school} | {edu.period}</p>
                {edu.grade && <p className="text-gray-700 text-sm mt-1">{edu.grade}</p>}
              </div>
            ))}
          </section>
        )}
        {/* Sở thích */}
        {cv.hobbies.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Sở thích</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm">
              {cv.hobbies.map((hobby, idx) => <li key={idx}>{hobby}</li>)}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
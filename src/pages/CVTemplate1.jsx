import React from 'react';

export default function CVTemplate1({ data }) {
  const sampleData = {
    name: 'Trần Nguyễn Tâm Đan',
    title: 'Nhân Viên Kinh Doanh',
    photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
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
      'Xin chào nhà tuyển dụng! Tôi là Trần Nguyễn Tâm Đan, một nhân viên kinh doanh trẻ tuổi đầy đam mê và nhiệt huyết...',
    experiences: [
      {
        position: 'Nhân Viên Kinh Doanh',
        company: 'Công Ty CP ...',
        period: '2022 - 2023',
        duties: [
          'Thực hiện các kế hoạch kinh doanh...',
          'Lập kế hoạch hoạt động năm, quý, tháng, tuần...',
          'Khảo sát, nghiên cứu, đánh giá doanh thu dự kiến...',
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
    <div className="max-w-4xl mx-auto shadow-lg p-6 flex flex-col md:flex-row font-sans">
      {/* Sidebar trái */}
      <aside className="md:w-1/3 bg-gray-800 text-white border-r border-gray-300 px-4 py-4 mb-6 md:mb-0">
        {cv.photoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={cv.photoUrl}
              alt={cv.name}
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold text-center mb-2">{cv.name}</h1>
        <p className="text-center opacity-80 mb-4">{cv.title}</p>

        {/* Thông tin liên hệ */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Thông tin</h2>
          <ul className="text-sm space-y-1">
            {cv.contact.phone && <li>📞 {cv.contact.phone}</li>}
            {cv.contact.email && <li>✉️ {cv.contact.email}</li>}
            {cv.contact.birthday && <li>🎂 {cv.contact.birthday}</li>}
            {cv.contact.location && <li>📍 {cv.contact.location}</li>}
          </ul>
        </section>

        {/* Kỹ năng */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Kỹ năng</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {cv.skills.map((skill, idx) => <li key={idx}>{skill}</li>)}
          </ul>
        </section>

        {/* Ngôn ngữ */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Ngôn ngữ</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {cv.languages.map((lang, idx) => <li key={idx}>{lang}</li>)}
          </ul>
        </section>

        {/* Kỹ năng mềm */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Kỹ năng mềm</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {cv.softSkills.map((soft, idx) => <li key={idx}>{soft}</li>)}
          </ul>
        </section>

        {/* Người tham chiếu */}
        <section>
          <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Người tham chiếu</h2>
          {cv.references.map((ref, idx) => (
            <div key={idx} className="text-sm mb-3">
              <p className="font-medium">{ref.name}</p>
              {ref.title && <p className="italic">{ref.title}</p>}
              {ref.phone && <p>📞 {ref.phone}</p>}
              {ref.email && <p>✉️ {ref.email}</p>}
            </div>
          ))}
        </section>
      </aside>

      {/* Nội dung chính */}
      <main className="md:w-2/3 bg-gray-100 pl-0 md:pl-6 py-4 px-4">
        {cv.objective && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Mục tiêu nghề nghiệp</h2>
            <p className="text-gray-800 text-sm whitespace-pre-line">{cv.objective}</p>
          </section>
        )}

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
                {exp.achievements?.length > 0 && (
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
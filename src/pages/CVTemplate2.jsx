import React from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

// Component CVTemplate2: layout để Thông tin liên hệ nằm bên trái dưới avatar, không indent
export default function CVTemplate2({ data }) {
  const sampleData = {
    name: 'Nguyễn Ngọc Vy',
    subtitle: 'Quản Trị Kinh Doanh Tổng Hợp',
    photoUrl: 'https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg',
    contact: {
      phone: '085 234 3477',
      fax: '089 923 0449',
      email: 'nguyengocvyyy00@gmail.com',
      facebook: 'https://facebook.com/nguyengocvy',
      instagram: 'https://instagram.com/nguyengocvy',
      address: '206 Huỳnh Tấn Phát, Quận Hải Châu, Đà Nẵng',
    },
    objective: 'Trở thành Chuyên viên trong lĩnh vực Kinh doanh & Marketing. Tôi hiện đang tìm kiếm hướng đi để phát triển bản thân. Và hiện tôi đang tin cho mình có hội để được làm việc ở môi trường đào tạo chuyên nghiệp và nhiệt huyết.',
    expertise: [
      'Kinh nghiệm về Microsoft & PowerPoint',
      'Kỹ năng giao tiếp đàm phán tốt',
      'Kinh nghiệm thiết kế trên phần mềm Canva',
      'Kỹ năng quản lý thời gian tốt',
      'Kỹ năng thuyết trình',
      'Giao tiếp tiếng Anh cơ bản',
    ],
    otherSkills: [
      'Khả năng phân tích các thông tin kỹ thuật phức tạp',
      'Kỹ năng lãnh đạo làm việc nhóm tốt',
      'Chú ý chi tiết',
      'Khả năng giải quyết vấn đề xuất sắc',
    ],
    hobbies: ['Đọc sách', 'Nấu ăn', 'Tập Thể Dục', 'Vẽ tranh'],
    experiences: [
      {
        title: 'Social Media Marketing tại Lạc Tự Wedding',
        details: [
          'Viết content nội dung cho bài viết trên Fanpage',
          'Tham gia ekip chụp hình, quay phim tại nơi làm việc',
          'Đề ra các chiến lược cho quảng cáo và tiếp thị',
        ],
      },
      {
        title: 'Marketing Associate tại CTY AZ Media',
        details: [
          'Lập kế hoạch tiếp thị cho CTY',
          'Tham gia các dự án PR của các đơn vị hợp tác',
          'Viết content và thiết kế hình ảnh cho CTY',
        ],
      },
      {
        title: 'Social Marketing Manager tại Shop Hoa Tươi',
        details: [
          'Lập kế hoạch chiến lược tiếp thị và quảng bá thương hiệu',
          'Thiết kế logo, banner, background của Shop',
          'Tư vấn chăm sóc khách hàng của Shop',
          'Viết content và nội dung cho bài viết trên page của Shop',
        ],
      },
    ],
    additionalNote: 'Và ngoài ra còn có kinh nghiệm ở một số công việc liên quan như bán hàng online, tư vấn viên telesales.',
    education: [
      {
        institution: 'Đại Học Kiến Trúc Đà Nẵng',
        details: [
          'Dự kiến tốt nghiệp nhận bằng tạm thời tháng 1/2022',
          'Hoàn thành tín chỉ Quản trị Kinh doanh Tổng hợp',
          'Điểm tích lũy qua 4 năm học đại học loại Giỏi trên 8.0',
          'Thành tích trong hoạt động phong trào loại Xuất sắc',
        ],
      },
    ],
    certificates: [
      'Chứng chỉ Digital Marketing của Google',
      'Chứng chỉ Digital Body Language',
      'Chứng chỉ Digital Networking Strategies',
    ],
  };

  const cv = data || sampleData;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden font-sans">
      {/* Header: khung nền xám chứa avatar và tên */}
      <div className="bg-gray-200 p-6 flex justify-center md:justify-start">
        <div className="flex items-center">
          {cv.photoUrl && (
            <img
              src={cv.photoUrl}
              alt={cv.name}
              className="w-48 h-48 object-cover rounded-md border border-gray-300"
            />
          )}
          <div className="ml-6 text-center md:text-left">
            <p className="text-sm uppercase text-gray-600">{cv.subtitle}</p>
            <h1 className="text-4xl font-bold text-gray-800">{cv.name}</h1>
          </div>
        </div>
      </div>

      {/* Section Thông tin liên hệ: nền trắng, nằm dưới header, căn lề trái cùng lề trắng */}
      <div className="bg-white p-6 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
          <ul className="space-y-2 break-words">
            {cv.contact.phone && (
              <li className="flex items-center">
                <FaPhone className="mr-2" /> <span className="break-words">{cv.contact.phone}</span>
              </li>
            )}
            {cv.contact.fax && (
              <li className="flex items-center">
                <FaFax className="mr-2" /> <span className="break-words">{cv.contact.fax}</span>
              </li>
            )}
            {cv.contact.email && (
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> <span className="break-words">{cv.contact.email}</span>
              </li>
            )}
          </ul>
          <ul className="space-y-2 break-words">
            {cv.contact.facebook && (
              <li className="flex items-center">
                <FaFacebook className="mr-2" />
                <a href={cv.contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:underline break-words">
                  Facebook
                </a>
              </li>
            )}
            {cv.contact.instagram && (
              <li className="flex items-center">
                <FaInstagram className="mr-2" />
                <a href={cv.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:underline break-words">
                  Instagram
                </a>
              </li>
            )}
            {cv.contact.address && (
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" /> <span className="break-words">{cv.contact.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Body nội dung: 2 cột trên desktop, cột đơn trên mobile */}
      <div className="flex flex-col md:flex-row">
        {/* Cột trái: Mục tiêu, Lĩnh vực chuyên môn, Kỹ năng khác, Sở thích */}
        <aside className="md:w-1/3 bg-white p-6 border-r border-gray-300">
          {cv.objective && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Mục tiêu nghề nghiệp</h2>
              <p className="text-gray-700 text-sm whitespace-pre-line">{cv.objective}</p>
            </section>
          )}
          {cv.expertise && cv.expertise.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Lĩnh vực chuyên môn</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {cv.expertise.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
          {cv.otherSkills && cv.otherSkills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Kỹ năng khác</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {cv.otherSkills.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
          {cv.hobbies && cv.hobbies.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">Sở thích</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {cv.hobbies.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
        </aside>
        {/* Cột phải: Kinh nghiệm làm việc, Lịch sử học vấn, Chứng chỉ */}
        <main className="md:w-2/3 bg-white p-6">
          {cv.experiences && cv.experiences.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Kinh nghiệm làm việc</h2>
              <p className="font-medium text-gray-800">2 năm trong lĩnh vực liên quan</p>
              {cv.experiences.map((exp, idx) => (
                <div key={idx} className="mt-3">
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {exp.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))}
              {cv.additionalNote && <p className="mt-2 text-gray-700 text-sm italic">{cv.additionalNote}</p>}
            </section>
          )}
          {cv.education && cv.education.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Lịch sử học vấn</h2>
              {cv.education.map((edu, idx) => (
                <div key={idx} className="mt-2">
                  <h3 className="text-lg font-medium">{edu.institution}</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}
          {cv.certificates && cv.certificates.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">Một số chứng chỉ đạt được</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {cv.certificates.map((c, idx) => <li key={idx}>{c}</li>)}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

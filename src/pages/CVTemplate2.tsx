import React from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

// Component CVTemplate2: layout để Thông tin liên hệ nằm bên trái dưới avatar, không indent
export default function CVTemplate2({ data, onContentChange, selectedFont }) {
  const handleSectionChange = (key, e) => {
    const content = e.currentTarget.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Extract title (h2 or h3)
    const titleElement = doc.querySelector('h2, h3');
    const newTitle = titleElement ? titleElement.textContent : data[key].title;

    // Extract content based on section type
    let newContent = {};
    if (key === 'objective') {
      const contentElement = doc.querySelector('p');
      newContent = { title: newTitle, content: contentElement ? contentElement.textContent : data[key].content };
    } else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
      const items = Array.from(doc.querySelectorAll('li')).map(li => li.textContent);
      newContent = { title: newTitle, items };
    } else if (key === 'experiences') {
      const summaryElement = doc.querySelector('p.font-medium');
      const additionalNoteElement = doc.querySelector('p.italic');
      const items = Array.from(doc.querySelectorAll('.experience-item')).map(item => {
        const itemTitle = item.querySelector('h3')?.textContent || '';
        const details = Array.from(item.querySelectorAll('li')).map(li => li.textContent);
        return { title: itemTitle, details };
      });
      newContent = {
        title: newTitle,
        summary: summaryElement ? summaryElement.textContent : data[key].summary,
        items,
        additionalNote: additionalNoteElement ? additionalNoteElement.textContent : data[key].additionalNote
      };
    } else if (key === 'education') {
      const items = Array.from(doc.querySelectorAll('.education-item')).map(item => {
        const institution = item.querySelector('h3')?.textContent || '';
        const details = Array.from(item.querySelectorAll('li')).map(li => li.textContent);
        return { institution, details };
      });
      newContent = { title: newTitle, items };
    }

    onContentChange(key, newContent);
  };

  const handleContactChange = (field, value) => {
    onContentChange('contact', { ...data.contact, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg overflow-hidden font-sans" style={{ fontFamily: selectedFont }}>
      {/* Header: khung nền xám chứa avatar và tên */}
      <div className="bg-gray-200 p-6 flex justify-center md:justify-start">
        <div className="flex items-center">
          {data.photoUrl && (
            <img
              src={data.photoUrl}
              alt={data.name}
              className="w-48 h-48 object-cover rounded-md border border-gray-300"
            />
          )}
          <div className="ml-6 text-center md:text-left">
            <p
              className="text-sm uppercase text-gray-600"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange('subtitle', e.currentTarget.textContent)}
            >
              {data.subtitle}
            </p>
            <h1
              className="text-4xl font-bold text-gray-800"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onContentChange('name', e.currentTarget.textContent)}
            >
              {data.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Section Thông tin liên hệ: nền trắng, nằm dưới header, căn lề trái cùng lề trắng */}
      <div className="bg-white p-6 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
          <ul className="space-y-2 break-words">
            {data.contact.phone && (
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('phone', e.currentTarget.textContent)}
                >
                  {data.contact.phone}
                </span>
              </li>
            )}
            {data.contact.fax && (
              <li className="flex items-center">
                <FaFax className="mr-2" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('fax', e.currentTarget.textContent)}
                >
                  {data.contact.fax}
                </span>
              </li>
            )}
            {data.contact.email && (
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('email', e.currentTarget.textContent)}
                >
                  {data.contact.email}
                </span>
              </li>
            )}
          </ul>
          <ul className="space-y-2 break-words">
            {data.contact.facebook && (
              <li className="flex items-center">
                <FaFacebook className="mr-2" />
                <a
                  href={data.contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-words"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('facebook', e.currentTarget.textContent)}
                >
                  Facebook
                </a>
              </li>
            )}
            {data.contact.instagram && (
              <li className="flex items-center">
                <FaInstagram className="mr-2" />
                <a
                  href={data.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-words"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('instagram', e.currentTarget.textContent)}
                >
                  Instagram
                </a>
              </li>
            )}
            {data.contact.address && (
              <li className="flex items-start">
                <FaMapMarkerAlt className="mr-2 mt-1" />
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange('address', e.currentTarget.textContent)}
                >
                  {data.contact.address}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Body nội dung: 2 cột trên desktop, cột đơn trên mobile */}
      <div className="flex flex-col md:flex-row">
        {/* Cột trái: Mục tiêu, Lĩnh vực chuyên môn, Kỹ năng khác, Sở thích */}
        <aside className="md:w-1/3 bg-white p-6 border-r border-gray-300">
          {data.objective && (
            <section className="mb-6" contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('objective', e)}>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">{data.objective.title}</h2>
              <p className="text-gray-700 text-sm whitespace-pre-line">{data.objective.content}</p>
            </section>
          )}
          {data.expertise && data.expertise.items.length > 0 && (
            <section className="mb-6" contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('expertise', e)}>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">{data.expertise.title}</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {data.expertise.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
          {data.otherSkills && data.otherSkills.items.length > 0 && (
            <section className="mb-6" contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('otherSkills', e)}>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">{data.otherSkills.title}</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {data.otherSkills.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
          {data.hobbies && data.hobbies.items.length > 0 && (
            <section contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('hobbies', e)}>
              <h2 className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2">{data.hobbies.title}</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                {data.hobbies.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </section>
          )}
        </aside>
        {/* Cột phải: Kinh nghiệm làm việc, Lịch sử học vấn, Chứng chỉ */}
        <main className="md:w-2/3 bg-white p-6">
          {data.experiences && data.experiences.items.length > 0 && (
            <section className="mb-6" contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('experiences', e)}>
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">{data.experiences.title}</h2>
              <p className="font-medium text-gray-800">{data.experiences.summary}</p>
              {data.experiences.items.map((exp, idx) => (
                <div key={idx} className="mt-3 experience-item">
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {exp.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))}
              {data.experiences.additionalNote && (
                <p className="mt-2 text-gray-700 text-sm italic">{data.experiences.additionalNote}</p>
              )}
            </section>
          )}
          {data.education && data.education.items.length > 0 && (
            <section className="mb-6" contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('education', e)}>
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">{data.education.title}</h2>
              {data.education.items.map((edu, idx) => (
                <div key={idx} className="mt-2 education-item">
                  <h3 className="text-lg font-medium">{edu.institution}</h3>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                    {edu.details.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}
          {data.certificates && data.certificates.items.length > 0 && (
            <section contentEditable suppressContentEditableWarning onBlur={(e) => handleSectionChange('certificates', e)}>
              <h2 className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2">{data.certificates.title}</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                {data.certificates.items.map((c, idx) => <li key={idx}>{c}</li>)}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
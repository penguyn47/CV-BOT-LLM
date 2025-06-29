import React, { useRef } from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

// Hàm debounce để trì hoãn cập nhật state
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Component CVTemplate2: layout để Thông tin liên hệ nằm bên trái dưới avatar, không indent
export default function CVTemplate2({ data, onContentChange, selectedFont, selectedColor }) {
  // Kiểm tra dữ liệu đầu vào
  if (!data) {
    console.error('Dữ liệu CV không tồn tại');
    return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
  }

  // Ref để lưu vị trí con trỏ
  const cursorPositions = useRef({});

  // Hàm lưu vị trí con trỏ
  const saveCursorPosition = (element, key) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      cursorPositions.current[key] = { startContainer: range.startContainer, startOffset: range.startOffset };
    }
  };

  // Hàm khôi phục vị trí con trỏ
  const restoreCursorPosition = (element, key) => {
    const position = cursorPositions.current[key];
    if (position && element.contains(position.startContainer)) {
      const range = document.createRange();
      try {
        range.setStart(position.startContainer, position.startOffset);
        range.collapse(true);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (error) {
        console.warn('Không thể khôi phục vị trí con trỏ:', error);
      }
    }
  };

  // Hàm xử lý keydown để ngăn chặn xóa toàn bộ nội dung
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      return;
    }
    const selection = window.getSelection();
    if (selection && selection.toString() === e.target.textContent) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        return;
      }
    }
  };

  // Hàm xử lý thay đổi tiêu đề mục
  const handleTitleChange = (key, e) => {
    try {
      const title = e.currentTarget.textContent.trim();
      onContentChange(key, { ...data[key], title });
    } catch (error) {
      console.error('Lỗi khi thay đổi tiêu đề:', error);
    }
  };

  // Hàm xử lý thay đổi nội dung mục với debounce
  const handleContentChange = debounce((key, e) => {
    try {
      const content = e.currentTarget.innerHTML;
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      let newContent = {};

      if (key === 'objective') {
        const contentElement = doc.querySelector('p') || doc.body;
        const contentText = contentElement.textContent.trim();
        newContent = { ...data[key], content: contentText };
      } else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
        const listItems = Array.from(doc.querySelectorAll('li'));
        const items = listItems
          .map(li => li.textContent.trim())
          .filter(text => text !== '' && text !== '•' && text !== '·' && text !== '-');
        newContent = { ...data[key], items };
      } else if (key === 'experiences') {
        const summaryElement = doc.querySelector('p.font-medium');
        const additionalNoteElement = doc.querySelector('p.italic');
        const experienceItems = Array.from(doc.querySelectorAll('.experience-item'));
        const items = experienceItems.map(item => {
          const itemTitle = item.querySelector('h3')?.textContent.trim() || '';
          const detailItems = Array.from(item.querySelectorAll('li'));
          const details = detailItems
            .map(li => li.textContent.trim())
            .filter(text => text !== '' && text !== '•' && text !== '·' && text !== '-');
          return { title: itemTitle, details };
        }).filter(item => item.title.trim() !== '' || item.details.length > 0);

        newContent = {
          ...data[key],
          summary: summaryElement ? summaryElement.textContent.trim() : (data[key]?.summary || ''),
          items,
          additionalNote: additionalNoteElement ? additionalNoteElement.textContent.trim() : (data[key]?.additionalNote || '')
        };
      } else if (key === 'education') {
        const educationItems = Array.from(doc.querySelectorAll('.education-item'));
        const items = educationItems.map(item => {
          const institution = item.querySelector('h3')?.textContent.trim() || '';
          const detailItems = Array.from(item.querySelectorAll('li'));
          const details = detailItems
            .map(li => li.textContent.trim())
            .filter(text => text !== '' && text !== '•' && text !== '·' && text !== '-');
          return { institution, details };
        }).filter(item => item.institution.trim() !== '' || item.details.length > 0);
        newContent = { ...data[key], items };
      }

      if (Object.keys(newContent).length > 0) {
        console.log('Cập nhật dữ liệu:', key, newContent);
        onContentChange(key, newContent);
      }
    } catch (error) {
      console.error('Lỗi khi xử lý thay đổi nội dung:', error);
    }
  }, 300); // Debounce 300ms

  const handleContactChange = (field, value) => {
    try {
      if (data.contact && typeof value === 'string') {
        onContentChange('contact', { ...data.contact, [field]: value });
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi thông tin liên hệ:', error);
    }
  };

  // Hàm xử lý focus cho thông tin liên hệ và tiêu đề
  const handleFocus = (e) => {
    const element = e.currentTarget;
    element.classList.remove('text-gray-400');
  };

  // Hàm xử lý blur cho thông tin liên hệ, tiêu đề, name và subtitle
  const handleBlur = (e, defaultText, key, field = null) => {
    const element = e.currentTarget;
    const text = element.textContent.trim();
    try {
      if (text === '') {
        element.textContent = defaultText;
        if (field) {
          handleContactChange(field, defaultText);
        } else if (key === 'name' || key === 'subtitle') {
          onContentChange(key, defaultText);
        } else {
          onContentChange(key, { ...data[key], title: defaultText });
        }
      } else {
        if (field) {
          handleContactChange(field, text);
        } else if (key === 'name' || key === 'subtitle') {
          onContentChange(key, text);
        } else {
          onContentChange(key, { ...data[key], title: text });
        }
      }
    } catch (error) {
      console.error('Lỗi khi xử lý blur:', error);
    }
  };

  return (
    <div
      className="mx-auto bg-white shadow-lg font-sans relative"
      style={{
        fontFamily: selectedFont,
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '0',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div className="p-6 flex justify-center md:justify-start" style={{ backgroundColor: selectedColor }}>
        <div className="flex items-center">
          <img
            src="/avatar2.png"
            alt="Avatar"
            className="w-40 h-40 object-cover rounded-md border border-gray-300"
          />
          <div className="ml-6 text-center md:text-left">
            <p
              className="text-sm uppercase text-gray-600"
              contentEditable
              suppressContentEditableWarning
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, 'Quản Trị Kinh Doanh', 'subtitle')}
            >
              {data.subtitle || 'Quản Trị Kinh Doanh'}
            </p>
            <h1
              className="text-4xl font-bold text-gray-800"
              contentEditable
              suppressContentEditableWarning
              onFocus={handleFocus}
              onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
            >
              {data.name || 'Họ và Tên'}
            </h1>
          </div>
        </div>
      </div>

      {/* Section Thông tin liên hệ */}
      <div className="bg-white p-6 pb-2 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
          <ul className="space-y-2 break-words">
            <li className="flex items-center">
              <FaPhone className="mr-2" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, '+84 123 456 789', 'contact', 'phone')}
              >
                {data.contact?.phone || '+84 123 456 789'}
              </span>
            </li>
            <li className="flex items-center">
              <FaFax className="mr-2" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, '+84 123 456 789', 'contact', 'fax')}
              >
                {data.contact?.fax || '+84 123 456 789'}
              </span>
            </li>
            <li className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, 'email@example.com', 'contact', 'email')}
              >
                {data.contact?.email || 'email@example.com'}
              </span>
            </li>
          </ul>
          <ul className="space-y-2 break-words">
            <li className="flex items-center">
              <FaFacebook className="mr-2" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, 'facebook.com/username', 'contact', 'facebook')}
              >
                {data.contact?.facebook || 'facebook.com/username'}
              </span>
            </li>
            <li className="flex items-center">
              <FaInstagram className="mr-2" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, 'instagram.com/username', 'contact', 'instagram')}
              >
                {data.contact?.instagram || 'instagram.com/username'}
              </span>
            </li>
            <li className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1" />
              <span
                contentEditable
                suppressContentEditableWarning
                className="text-gray-700"
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, '123 Đường ABC, Quận 1, TP.HCM', 'contact', 'address')}
              >
                {data.contact?.address || '123 Đường ABC, Quận 1, TP.HCM'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Body nội dung: 2 cột trên desktop, cột đơn trên mobile */}
      <div className="flex flex-col md:flex-row relative">
        {/* Đường ngăn cách dọc cố định */}
        <div
          className="hidden md:block absolute left-[70mm] top-0 w-px bg-gray-300"
          style={{ height: '207mm' }}
        ></div>
        {/* Cột trái */}
        <aside className="md:w-1/3 bg-white p-6">
          <section className="mb-6">
            <h2
              className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('objective', e)}
            >
              {data.objective?.title || 'Mục tiêu nghề nghiệp'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'objective');
                handleContentChange('objective', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'objective'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: `<p class="text-gray-700">${data.objective?.content || 'Phát triển sự nghiệp trong lĩnh vực công nghệ thông tin, đóng góp vào các dự án sáng tạo và đổi mới...'}</p>`
              }}
            />
          </section>
          <section className="mb-6">
            <h2
              className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('objective', e)}
            >
              {data.expertise?.title || 'Lĩnh vực chuyên môn'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'expertise');
                handleContentChange('expertise', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'expertise'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: `<ul class="list-disc list-inside text-sm space-y-1">${data.expertise?.items?.length > 0
                    ? data.expertise.items.map(item => `<li>${item}</li>`).join('')
                    : [
                      'Thành thạo Microsoft Office (Word, Excel, PowerPoint)',
                      'Kỹ năng phân tích dữ liệu',
                      'Quản lý dự án'
                    ].map(item => `<li>${item}</li>`).join('')
                  }</ul>`
              }}
            />
          </section>
          <section className="mb-6">
            <h2
              className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('otherSkills', e)}
            >
              {data.otherSkills?.title || 'Kỹ năng khác'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'otherSkills');
                handleContentChange('otherSkills', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'otherSkills'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: `<ul class="list-disc list-inside text-sm space-y-1">${data.otherSkills?.items?.length > 0
                    ? data.otherSkills.items.map(item => `<li>${item}</li>`).join('')
                    : [
                      'Lãnh đạo nhóm',
                      'Giải quyết vấn đề',
                      'Giao tiếp đa văn hóa'
                    ].map(item => `<li>${item}</li>`).join('')
                  }</ul>`
              }}
            />
          </section>
          <section>
            <h2
              className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('hobbies', e)}
            >
              {data.hobbies?.title || 'Sở thích'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'hobbies');
                handleContentChange('hobbies', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'hobbies'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: `<ul class="list-disc list-inside text-sm space-y-1">${data.hobbies?.items?.length > 0
                    ? data.hobbies.items.map(item => `<li>${item}</li>`).join('')
                    : [
                      'Đọc sách phát triển bản thân',
                      'Du lịch khám phá văn hóa',
                      'Chơi thể thao (bóng đá, cầu lông)'
                    ].map(item => `<li>${item}</li>`).join('')
                  }</ul>`
              }}
            />
          </section>
        </aside>
        {/* Cột phải */}
        <main className="md:w-2/3 bg-white p-6">
          <section className="mb-6">
            <h2
              className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('experiences', e)}
            >
              {data.experiences?.title || 'Kinh nghiệm làm việc'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'experiences');
                handleContentChange('experiences', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'experiences'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: (() => {
                  let html = `<p class="font-medium text-gray-700">${data.experiences?.summary || 'Hơn 3 năm kinh nghiệm trong lĩnh vực phát triển phần mềm...'}</p>`;
                  if (data.experiences?.items?.length > 0) {
                    data.experiences.items.forEach(exp => {
                      html += `<div class="mt-3 experience-item">
                        <h3 class="text-lg font-medium text-gray-700">${exp.title || 'Nhân viên kinh doanh'}</h3>
                        <ul class="list-disc list-inside text-sm mt-1">`;
                      if (exp.details?.length > 0) {
                        exp.details.forEach(d => {
                          html += `<li class="text-gray-700">${d}</li>`;
                        });
                      } else {
                        html += `<li class="text-gray-700">Quản lý danh mục khách hàng</li>
                          <li class="text-gray-700">Đạt doanh số 500 triệu/tháng</li>`;
                      }
                      html += `</ul></div>`;
                    });
                  } else {
                    html += `<div class="mt-3 experience-item">
                      <h3 class="text-lg font-medium text-gray-700">Nhân viên kinh doanh</h3>
                      <ul class="list-disc list-inside text-sm mt-1">
                        <li class="text-gray-700">Quản lý danh mục khách hàng</li>
                        <li class="text-gray-700">Đạt doanh số 500 triệu/tháng</li>
                      </ul>
                    </div>
                    <div class="mt-3 experience-item">
                      <h3 class="text-lg font-medium text-gray-700">Trợ lý marketing</h3>
                      <ul class="list-disc list-inside text-sm mt-1">
                        <li class="text-gray-700">Lập kế hoạch quảng cáo</li>
                        <li class="text-gray-700">Phân tích hiệu quả chiến dịch</li>
                      </ul>
                    </div>`;
                  }
                  html += `<p class="mt-2 text-sm italic text-gray-700">${data.experiences?.additionalNote || 'Có kinh nghiệm làm việc với các đối tác quốc tế...'}</p>`;
                  return html;
                })()
              }}
            />
          </section>
          <section className="mb-6">
            <h2
              className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('education', e)}
            >
              {data.education?.title || 'Lịch sử học vấn'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'education');
                handleContentChange('education', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'education'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: (() => {
                  let html = '';
                  if (data.education?.items?.length > 0) {
                    data.education.items.forEach(edu => {
                      html += `<div class="mt-2 education-item">
                        <h3 class="text-lg font-medium text-gray-700">${edu.institution || 'Đại học Kinh tế Quốc dân'}</h3>
                        <ul class="list-disc list-inside text-sm mt-1">`;
                      if (edu.details?.length > 0) {
                        edu.details.forEach(d => {
                          html += `<li class="text-gray-700">${d}</li>`;
                        });
                      } else {
                        html += `<li class="text-gray-700">Cử nhân Quản trị Kinh doanh, 2018-2022</li>
                          <li class="text-gray-700">GPA 3.5/4.0</li>`;
                      }
                      html += `</ul></div>`;
                    });
                  } else {
                    html += `<div class="mt-2 education-item">
                      <h3 className="text-lg font-medium text-gray-700">Đại học Kinh tế Quốc dân</h3>
                      <ul class="list-disc list-inside text-sm mt-1">
                        <li class="text-gray-700">Cử nhân Quản trị Kinh doanh, 2018-2022</li>
                        <li class="text-gray-700">GPA 3.5/4.0</li>
                      </ul>
                    </div>
                    <div class="mt-2 education-item">
                      <h3 class="text-lg font-medium text-gray-700">Đại học Công nghệ Thông tin</h3>
                      <ul class="list-disc list-inside text-sm mt-1">
                        <li class="text-gray-700">Thạc sĩ Khoa học Máy tính, 2022-2024</li>
                        <li class="text-gray-700">Nghiên cứu trí tuệ nhân tạo</li>
                      </ul>
                    </div>`;
                  }
                  return html;
                })()
              }}
            />
          </section>
          <section>
            <h2
              className="text-xl font-semibold border-b border-gray-500 pb-1 mb-2"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              onBlur={(e) => handleTitleChange('certificates', e)}
            >
              {data.certificates?.title || 'Một số chứng chỉ đạt được'}
            </h2>
            <div
              contentEditable
              suppressContentEditableWarning
              className="text-sm text-gray-700"
              onInput={(e) => {
                saveCursorPosition(e.currentTarget, 'certificates');
                handleContentChange('certificates', e);
                setTimeout(() => restoreCursorPosition(e.currentTarget, 'certificates'), 0);
              }}
              onKeyDown={handleKeyDown}
              dangerouslySetInnerHTML={{
                __html: `<ul class="list-disc list-inside text-sm mt-1">${data.certificates?.items?.length > 0
                    ? data.certificates.items.map(item => `<li>${item}</li>`).join('')
                    : [
                      'Chứng chỉ TOEIC 800',
                      'Chứng chỉ PMP (Quản lý dự án chuyên nghiệp)',
                      'Chứng chỉ Google Analytics'
                    ].map(item => `<li>${item}</li>`).join('')
                  }</ul>`
              }}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
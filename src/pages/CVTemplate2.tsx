import React, { useState } from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import EditableSection from '@/components/EditableSection';

// Hàm debounce để trì hoãn cập nhật state
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

interface CVTemplate2Props {
  data: {
    name: string;
    subtitle: string;
    contact: {
      phone: string;
      fax: string;
      email: string;
      facebook: string;
      instagram: string;
      address: string;
    };
    objective: { title: string; content: string };
    expertise: { title: string; items: string[] };
    otherSkills: { title: string; items: string[] };
    hobbies: { title: string; items: string[] };
    experiences: { title: string; summary: string; items: { title: string; details: string[] }[]; additionalNote: string };
    education: { title: string; items: { institution: string; details: string[] }[] };
    certificates: { title: string; items: string[] };
  };
  onContentChange: (key: keyof CVTemplate2Props['data'], value: any) => void;
  selectedFont: string;
  selectedColor: string;
}

export default function CVTemplate2({ data, onContentChange, selectedFont, selectedColor }: CVTemplate2Props) {
  // Kiểm tra dữ liệu đầu vào
  if (!data) {
    console.error('Dữ liệu CV không tồn tại');
    return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
  }

  // State để theo dõi section đang focus
  const [focusedSection, setFocusedSection] = useState<string | null>(null);

  // Hàm xử lý keydown để ngăn chặn xóa toàn bộ nội dung
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      return;
    }
    const selection = window.getSelection();
    if (selection && selection.toString() === (e.target as HTMLElement).textContent) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        return;
      }
    }
  };

  // Hàm xử lý thay đổi thông tin liên hệ
  const handleContactChange = (field: keyof CVTemplate2Props['data']['contact'], value: string) => {
    try {
      if (data.contact && typeof value === 'string') {
        onContentChange('contact', { ...data.contact, [field]: value });
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi thông tin liên hệ:', error);
    }
  };

  // Hàm xử lý focus cho thông tin liên hệ và tiêu đề
  const handleFocus = (e: React.FocusEvent, sectionKey: string) => {
    const element = e.currentTarget;
    element.classList.remove('text-gray-400');
    setFocusedSection(sectionKey);
  };

  // Hàm xử lý blur cho thông tin liên hệ, tiêu đề, name và subtitle
  const handleBlur = (e: React.FocusEvent, defaultText: string, key: keyof CVTemplate2Props['data'], field: keyof CVTemplate2Props['data']['contact'] | null = null) => {
    const element = e.currentTarget;
    const text = element.textContent?.trim() || '';
    try {
      if (text === '') {
        element.textContent = defaultText;
        if (field) {
          handleContactChange(field, defaultText);
        } else {
          onContentChange(key, text);
        }
      } else {
        if (field) {
          handleContactChange(field, text);
        } else {
          onContentChange(key, text);
        }
      }
    } catch (error) {
      console.error('Lỗi khi xử lý blur:', error);
    }
  };

  // Hàm xử lý thêm section mới
  const handleAddSection = (key: keyof CVTemplate2Props['data'], index: number | null = null) => {
    try {
      if (key === 'experiences') {
        const newItem = { title: 'Vị trí mới', details: ['Mô tả công việc mới'] };
        const newItems = index !== null
          ? [
              ...data.experiences.items.slice(0, index + 1),
              newItem,
              ...data.experiences.items.slice(index + 1),
            ]
          : [...data.experiences.items, newItem];
        onContentChange(key, {
          ...data.experiences,
          items: newItems,
        });
      } else if (key === 'education') {
        const newItem = { institution: 'Trường mới', details: ['Thông tin học vấn mới'] };
        const newItems = index !== null
          ? [
              ...data.education.items.slice(0, index + 1),
              newItem,
              ...data.education.items.slice(index + 1),
            ]
          : [...data.education.items, newItem];
        onContentChange(key, {
          ...data.education,
          items: newItems,
        });
      } else if (key === 'expertise') {
        const newItem = 'Kỹ năng mới';
        const newItems = index !== null
          ? [
              ...data.expertise.items.slice(0, index + 1),
              newItem,
              ...data.expertise.items.slice(index + 1),
            ]
          : [...data.expertise.items, newItem];
        onContentChange(key, {
          ...data.expertise,
          items: newItems,
        });
      } else if (key === 'otherSkills') {
        const newItem = 'Kỹ năng mới';
        const newItems = index !== null
          ? [
              ...data.otherSkills.items.slice(0, index + 1),
              newItem,
              ...data.otherSkills.items.slice(index + 1),
            ]
          : [...data.otherSkills.items, newItem];
        onContentChange(key, {
          ...data.otherSkills,
          items: newItems,
        });
      } else if (key === 'hobbies') {
        const newItem = 'Sở thích mới';
        const newItems = index !== null
          ? [
              ...data.hobbies.items.slice(0, index + 1),
              newItem,
              ...data.hobbies.items.slice(index + 1),
            ]
          : [...data.hobbies.items, newItem];
        onContentChange(key, {
          ...data.hobbies,
          items: newItems,
        });
      } else if (key === 'certificates') {
        const newItem = 'Chứng chỉ mới';
        const newItems = index !== null
          ? [
              ...data.certificates.items.slice(0, index + 1),
              newItem,
              ...data.certificates.items.slice(index + 1),
            ]
          : [...data.certificates.items, newItem];
        onContentChange(key, {
          ...data.certificates,
          items: newItems,
        });
      }
      console.log(`Đã thêm section mới cho ${key} tại ${index !== null ? `vị trí ${index + 1}` : 'cuối danh sách'}`);
    } catch (error) {
      console.error('Lỗi khi thêm section:', error);
    }
  };

  // Hàm xử lý xóa section
  const handleDeleteSection = (key: keyof CVTemplate2Props['data'], index: number | null = null) => {
    try {
      if (key === 'objective') {
        onContentChange(key, { ...data.objective, content: '' });
      } else if (key === 'expertise') {
        if (index !== null) {
          const newItems = data.expertise.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.expertise, items: newItems });
        } else {
          onContentChange(key, { ...data.expertise, items: [] });
        }
      } else if (key === 'otherSkills') {
        if (index !== null) {
          const newItems = data.otherSkills.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.otherSkills, items: newItems });
        } else {
          onContentChange(key, { ...data.otherSkills, items: [] });
        }
      } else if (key === 'hobbies') {
        if (index !== null) {
          const newItems = data.hobbies.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.hobbies, items: newItems });
        } else {
          onContentChange(key, { ...data.hobbies, items: [] });
        }
      } else if (key === 'certificates') {
        if (index !== null) {
          const newItems = data.certificates.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.certificates, items: newItems });
        } else {
          onContentChange(key, { ...data.certificates, items: [] });
        }
      } else if (key === 'experiences') {
        if (index !== null) {
          const newItems = data.experiences.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.experiences, items: newItems });
        } else {
          onContentChange(key, { ...data.experiences, items: [], summary: '', additionalNote: '' });
        }
      } else if (key === 'education') {
        if (index !== null) {
          const newItems = data.education.items.filter((_, i) => i !== index);
          onContentChange(key, { ...data.education, items: newItems });
        } else {
          onContentChange(key, { ...data.education, items: [] });
        }
      }
      console.log(`Đã xóa section ${key}${index !== null ? ` tại index ${index}` : ''}`);
      setFocusedSection(null);
    } catch (error) {
      console.error('Lỗi khi xóa section:', error);
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
        boxSizing: 'border-box',
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
              onFocus={(e) => handleFocus(e, 'subtitle')}
              onBlur={(e) => handleBlur(e, 'Quản Trị Kinh Doanh', 'subtitle')}
            >
              {data.subtitle || 'Quản Trị Kinh Doanh'}
            </p>
            <h1
              className="text-4xl font-bold text-gray-800"
              contentEditable
              suppressContentEditableWarning
              onFocus={(e) => handleFocus(e, 'name')}
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
                onFocus={(e) => handleFocus(e, 'contact-phone')}
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
                onFocus={(e) => handleFocus(e, 'contact-fax')}
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
                onFocus={(e) => handleFocus(e, 'contact-email')}
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
                onFocus={(e) => handleFocus(e, 'contact-facebook')}
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
                onFocus={(e) => handleFocus(e, 'contact-instagram')}
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
                onFocus={(e) => handleFocus(e, 'contact-address')}
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
          style={{ height: '202mm' }}
        ></div>
        {/* Cột trái */}
        <aside className="md:w-1/3 bg-white p-6">
          <EditableSection
            sectionKey="objective"
            title={data.objective?.title || 'Mục tiêu nghề nghiệp'}
            content={data.objective?.content}
            defaultContent="Phát triển sự nghiệp trong lĩnh vực công nghệ thông tin, đóng góp vào các dự án sáng tạo và đổi mới..."
            type="text"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={(key) => handleAddSection(key, null)} // Không cần index cho objective
            onDeleteSection={handleDeleteSection}
          />
          <EditableSection
            sectionKey="expertise"
            title={data.expertise?.title || 'Lĩnh vực chuyên môn'}
            content={data.expertise?.items}
            defaultContent={['Thành thạo Microsoft Office (Word, Excel, PowerPoint)', 'Kỹ năng phân tích dữ liệu', 'Quản lý dự án']}
            type="list"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
          <EditableSection
            sectionKey="otherSkills"
            title={data.otherSkills?.title || 'Kỹ năng khác'}
            content={data.otherSkills?.items}
            defaultContent={['Lãnh đạo nhóm', 'Giải quyết vấn đề', 'Giao tiếp đa văn hóa']}
            type="list"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
          <EditableSection
            sectionKey="hobbies"
            title={data.hobbies?.title || 'Sở thích'}
            content={data.hobbies?.items}
            defaultContent={['Đọc sách phát triển bản thân', 'Du lịch khám phá văn hóa', 'Chơi thể thao (bóng đá, cầu lông)']}
            type="list"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
        </aside>
        {/* Cột phải */}
        <main className="md:w-2/3 bg-white p-6">
          <EditableSection
            sectionKey="experiences"
            title={data.experiences?.title || 'Kinh nghiệm làm việc'}
            content={{
              summary: data.experiences?.summary,
              items: data.experiences?.items,
              additionalNote: data.experiences?.additionalNote,
            }}
            defaultContent={{
              summary: 'Hơn 3 năm kinh nghiệm trong lĩnh vực phát triển phần mềm...',
              items: [
                { title: 'Nhân viên kinh doanh', details: ['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'] },
                { title: 'Trợ lý marketing', details: ['Lập kế hoạch quảng cáo', 'Phân tích hiệu quả chiến dịch'] },
              ],
              additionalNote: 'Có kinh nghiệm làm việc với các đối tác quốc tế...',
            }}
            type="complex"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
          <EditableSection
            sectionKey="education"
            title={data.education?.title || 'Lịch sử học vấn'}
            content={data.education?.items}
            defaultContent={[
              { institution: 'Đại học Kinh tế Quốc dân', details: ['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'] },
              { institution: 'Đại học Công nghệ Thông tin', details: ['Thạc sĩ Khoa học Máy tính, 2022-2024', 'Nghiên cứu trí tuệ nhân tạo'] },
            ]}
            type="complex"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
          <EditableSection
            sectionKey="certificates"
            title={data.certificates?.title || 'Một số chứng chỉ đạt được'}
            content={data.certificates?.items}
            defaultContent={['Chứng chỉ TOEIC 800', 'Chứng chỉ PMP (Quản lý dự án chuyên nghiệp)', 'Chứng chỉ Google Analytics']}
            type="list"
            onContentChange={onContentChange}
            onKeyDown={handleKeyDown}
            selectedFont={selectedFont}
            selectedColor={selectedColor}
            onAddSection={handleAddSection}
            onDeleteSection={handleDeleteSection}
          />
        </main>
      </div>
    </div>
  );
}
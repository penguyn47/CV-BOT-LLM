import React, { useState } from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import EditableSection from '@/components/EditableSection';

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
    leftSections: { title: string; content: string }[];
    rightSections: { title: string; content: string }[];
  };
  onContentChange: (key: keyof CVTemplate2Props['data'], value: any) => void;
  selectedFont: string;
  selectedColor: string;
}

export default function CVTemplate2({ data, onContentChange, selectedFont, selectedColor }: CVTemplate2Props) {
  if (!data) {
    console.error('Dữ liệu CV không tồn tại');
    return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
  }

  const [focusedSection, setFocusedSection] = useState<string | null>(null);

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

  const handleContactChange = (field: keyof CVTemplate2Props['data']['contact'], value: string) => {
    try {
      if (data.contact && typeof value === 'string') {
        onContentChange('contact', { ...data.contact, [field]: value });
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi thông tin liên hệ:', error);
    }
  };

  const handleFocus = (e: React.FocusEvent, sectionKey: string) => {
    const element = e.currentTarget;
    element.classList.remove('text-gray-400');
    setFocusedSection(sectionKey);
  };

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

  const handleAddSection = (index: number, side: 'left' | 'right') => {
    try {
      const newSection = { title: 'Tiêu đề', content: 'Nội dung' };
      let newLeftSections = [...data.leftSections];
      let newRightSections = [...data.rightSections];

      if (side === 'left') {
        newLeftSections.splice(index + 1, 0, newSection);
        onContentChange('leftSections', newLeftSections);
      } else {
        newRightSections.splice(index + 1, 0, newSection);
        onContentChange('rightSections', newRightSections);
      }

      console.log(`Đã thêm section mới vào ${side} tại vị trí ${index}`);
    } catch (error) {
      console.error('Lỗi khi thêm section:', error);
    }
  };

  const handleDeleteSection = (index: number, side: 'left' | 'right') => {
    try {
      let newLeftSections = [...data.leftSections];
      let newRightSections = [...data.rightSections];

      if (side === 'left') {
        newLeftSections = newLeftSections.filter((_, i) => i !== index);
        onContentChange('leftSections', newLeftSections);
      } else {
        newRightSections = newRightSections.filter((_, i) => i !== index);
        onContentChange('rightSections', newRightSections);
      }

      console.log(`Đã xóa section tại ${side}, vị trí ${index}`);
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

      <div className="flex flex-col md:flex-row relative">
        <div
          className="hidden md:block absolute left-[70mm] top-0 w-px bg-gray-300"
          style={{ height: '202mm' }}
        ></div>
        <aside className="md:w-1/3 bg-white p-6">
          {data.leftSections.map((section, index) => (
            <EditableSection
              key={`left-section-${index}`}
              sectionKey={`left-section-${index}`}
              title={section.title}
              content={section.content}
              defaultContent="Nội dung"
              onContentChange={(key, value) => {
                const newLeftSections = [...data.leftSections];
                newLeftSections[index] = value;
                onContentChange('leftSections', newLeftSections);
              }}
              onKeyDown={handleKeyDown}
              selectedFont={selectedFont}
              selectedColor={selectedColor}
              onAddSection={() => handleAddSection(index, 'left')}
              onDeleteSection={() => handleDeleteSection(index, 'left')}
              setFocusedSection={setFocusedSection}
            />
          ))}
        </aside>
        <main className="md:w-2/3 bg-white p-6">
          {data.rightSections.map((section, index) => (
            <EditableSection
              key={`right-section-${index}`}
              sectionKey={`right-section-${index}`}
              title={section.title}
              content={section.content}
              defaultContent="Nội dung"
              onContentChange={(key, value) => {
                const newRightSections = [...data.rightSections];
                newRightSections[index] = value;
                onContentChange('rightSections', newRightSections);
              }}
              onKeyDown={handleKeyDown}
              selectedFont={selectedFont}
              selectedColor={selectedColor}
              onAddSection={() => handleAddSection(index, 'right')}
              onDeleteSection={() => handleDeleteSection(index, 'right')}
              setFocusedSection={setFocusedSection}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
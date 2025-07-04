import React, { useState, useEffect, useRef } from 'react';
import { FaPhone, FaFax, FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import EditableSection from '@/components/EditableSection';
import { v4 as uuidv4 } from 'uuid';

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
    leftSections: { id: string; title: string; content: string }[];
    rightSections: { id: string; title: string; content: string }[];
  };
  onContentChange: (key: keyof CVTemplate2Props['data'], value: any) => void;
  selectedFont: string;
  selectedColor: string;
}

interface Page {
  leftSections: { id: string; title: string; content: string }[];
  rightSections: { id: string; title: string; content: string }[];
}

export default function CVTemplate2({ data, onContentChange, selectedFont, selectedColor }: CVTemplate2Props) {
  if (!data) {
    console.error('Dữ liệu CV không tồn tại');
    return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
  }

  const [focusedSection, setFocusedSection] = useState<string | null>(null);
  const [pages, setPages] = useState<Page[]>([
    { leftSections: data.leftSections, rightSections: data.rightSections },
  ]);
  const mainPageRef = useRef<HTMLDivElement>(null);
  const extraPageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const MAX_PAGE_HEIGHT = 115 * 3.779527559; // 202mm for first page body
  const MAX_PAGE_HEIGHT_SUBSEQUENT = 213 * 3.779527559; // 297mm for subsequent pages

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

  const estimateSectionHeight = (section: { title: string; content: string }) => {
    const titleHeight = 18 * 1.5; // h3 font-size: 18px, line-height: 1.5
    const contentFontSize = 14; // p font-size: 14px
    const lineHeight = contentFontSize * 1.5; // line-height: 1.5
    const padding = 6 * 2; // 6px padding top and bottom per section

    // Estimate number of lines in content
    const lines = section.content.split('\n').length || 1;
    const contentHeight = lines * lineHeight;

    return titleHeight + contentHeight + padding; // Total height in pixels
  };

  const distributeSectionsToPages = () => {
    const newPages: Page[] = [{ leftSections: [], rightSections: [] }];
    let currentLeftHeight = 0;
    let currentRightHeight = 0;
    let currentPageIndex = 0;

    const addSectionToPage = (section: { id: string; title: string; content: string }, side: 'left' | 'right') => {
      const height = estimateSectionHeight(section);
      const maxHeight = currentPageIndex === 0 ? MAX_PAGE_HEIGHT : MAX_PAGE_HEIGHT_SUBSEQUENT;

      if (side === 'left') {
        if (currentLeftHeight + height > maxHeight) {
          currentPageIndex++;
          newPages.push({ leftSections: [], rightSections: newPages[currentPageIndex - 1].rightSections });
          currentLeftHeight = 0;
        }
        newPages[currentPageIndex].leftSections.push(section);
        currentLeftHeight += height;
      } else {
        if (currentRightHeight + height > maxHeight) {
          currentPageIndex++;
          newPages.push({ leftSections: newPages[currentPageIndex - 1].leftSections, rightSections: [] });
          currentRightHeight = 0;
        }
        newPages[currentPageIndex].rightSections.push(section);
        currentRightHeight += height;
      }
    };

    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < data.leftSections.length || rightIndex < data.rightSections.length) {
      if (leftIndex < data.leftSections.length) {
        addSectionToPage(data.leftSections[leftIndex], 'left');
        leftIndex++;
      }
      if (rightIndex < data.rightSections.length) {
        addSectionToPage(data.rightSections[rightIndex], 'right');
        rightIndex++;
      }
    }

    // Only update pages if they have content
    if (newPages[newPages.length - 1].leftSections.length > 0 || newPages[newPages.length - 1].rightSections.length > 0) {
      setPages(newPages);
    } else {
      setPages(newPages.slice(0, -1));
    }
  };

  const handleAddSection = (sectionId: string, side: 'left' | 'right') => {
    try {
      const newSection = { id: uuidv4(), title: 'Tiêu đề', content: 'Nội dung' };
      let newLeftSections = [...data.leftSections];
      let newRightSections = [...data.rightSections];

      if (side === 'left') {
        const index = newLeftSections.findIndex((s) => s.id === sectionId);
        newLeftSections.splice(index + 1, 0, newSection);
        onContentChange('leftSections', newLeftSections);
      } else {
        const index = newRightSections.findIndex((s) => s.id === sectionId);
        newRightSections.splice(index + 1, 0, newSection);
        onContentChange('rightSections', newRightSections);
      }

      console.log(`Đã thêm section mới vào ${side} tại vị trí sau section ${sectionId}`);
      setTimeout(distributeSectionsToPages, 0); // Redistribute after render
    } catch (error) {
      console.error('Lỗi khi thêm section:', error);
    }
  };

  const handleDeleteSection = (sectionId: string, side: 'left' | 'right', pageIndex: number) => {
    try {
      // Luôn cập nhật dữ liệu gốc
      let newLeftSections = [...data.leftSections];
      let newRightSections = [...data.rightSections];

      if (side === 'left') {
        newLeftSections = newLeftSections.filter((s) => s.id !== sectionId);
        onContentChange('leftSections', newLeftSections);
      } else {
        newRightSections = newRightSections.filter((s) => s.id !== sectionId);
        onContentChange('rightSections', newRightSections);
      }

      // Cập nhật state pages
      const newPages = [...pages];
      if (pageIndex > 0) {
        if (side === 'left') {
          newPages[pageIndex].leftSections = newPages[pageIndex].leftSections.filter((s) => s.id !== sectionId);
        } else {
          newPages[pageIndex].rightSections = newPages[pageIndex].rightSections.filter((s) => s.id !== sectionId);
        }
        setPages(newPages);
      }

      console.log(`Đã xóa section tại ${side}, id ${sectionId}, page ${pageIndex}`);
      setFocusedSection(null);
      setTimeout(distributeSectionsToPages, 0); // Redistribute after render
    } catch (error) {
      console.error('Lỗi khi xóa section:', error);
    }
  };

  const handleSectionContentChange = (sectionId: string, side: 'left' | 'right', value: { title: string; content: string }, pageIndex: number) => {
    try {
      // Luôn cập nhật dữ liệu gốc
      let newLeftSections = [...data.leftSections];
      let newRightSections = [...data.rightSections];

      if (side === 'left') {
        const sectionIndex = newLeftSections.findIndex((s) => s.id === sectionId);
        if (sectionIndex !== -1) {
          newLeftSections[sectionIndex] = { ...newLeftSections[sectionIndex], ...value };
          onContentChange('leftSections', newLeftSections);
        }
      } else {
        const sectionIndex = newRightSections.findIndex((s) => s.id === sectionId);
        if (sectionIndex !== -1) {
          newRightSections[sectionIndex] = { ...newRightSections[sectionIndex], ...value };
          onContentChange('rightSections', newRightSections);
        }
      }

      // Cập nhật state pages để đồng bộ ngay lập tức
      const newPages = [...pages];
      if (pageIndex > 0) {
        if (side === 'left') {
          const sectionIndex = newPages[pageIndex].leftSections.findIndex((s) => s.id === sectionId);
          if (sectionIndex !== -1) {
            newPages[pageIndex].leftSections[sectionIndex] = { ...newPages[pageIndex].leftSections[sectionIndex], ...value };
          }
        } else {
          const sectionIndex = newPages[pageIndex].rightSections.findIndex((s) => s.id === sectionId);
          if (sectionIndex !== -1) {
            newPages[pageIndex].rightSections[sectionIndex] = { ...newPages[pageIndex].rightSections[sectionIndex], ...value };
          }
        }
        setPages(newPages);
      }

      setTimeout(distributeSectionsToPages, 0); // Redistribute after render
    } catch (error) {
      console.error('Lỗi khi chỉnh sửa section:', error);
    }
  };

  useEffect(() => {
    setTimeout(distributeSectionsToPages, 0); // Redistribute on initial render or data change
  }, [data.leftSections, data.rightSections]);

  const renderPage = (
    leftSections: { id: string; title: string; content: string }[],
    rightSections: { id: string; title: string; content: string }[],
    index: number
  ) => (
    <div
      key={index}
      className="mx-auto bg-white shadow-lg font-sans relative body-container"
      style={{
        fontFamily: selectedFont,
        width: '210mm',
        height: index === 0 ? '202mm' : '297mm',
        minHeight: index === 0 ? '202mm' : '297mm',
        maxWidth: '210mm',
        margin: index === 0 ? '0 auto' : '20mm auto',
        padding: '0',
        boxSizing: 'border-box',
      }}
      ref={(el: HTMLDivElement | null) => {
        extraPageRefs.current[index] = el;
      }}
    >
      <div className="flex flex-col md:flex-row relative">
        <div
          className="hidden md:block absolute left-[70mm] top-0 w-px bg-gray-300"
          style={{ height: index === 0 ? '202mm' : '297mm' }}
        ></div>
        <aside className="md:w-1/3 bg-white p-6">
          {leftSections.map((section) => (
            <EditableSection
              key={section.id}
              sectionKey={section.id}
              title={section.title}
              content={section.content}
              defaultContent="Nội dung"
              onContentChange={(key, value) => handleSectionContentChange(section.id, 'left', value, index)}
              onKeyDown={handleKeyDown}
              selectedFont={selectedFont}
              selectedColor={selectedColor}
              onAddSection={() => handleAddSection(section.id, 'left')}
              onDeleteSection={() => handleDeleteSection(section.id, 'left', index)}
              setFocusedSection={setFocusedSection}
            />
          ))}
        </aside>
        <main className="md:w-2/3 bg-white p-6">
          {rightSections.map((section) => (
            <EditableSection
              key={section.id}
              sectionKey={section.id}
              title={section.title}
              content={section.content}
              defaultContent="Nội dung"
              onContentChange={(key, value) => handleSectionContentChange(section.id, 'right', value, index)}
              onKeyDown={handleKeyDown}
              selectedFont={selectedFont}
              selectedColor={selectedColor}
              onAddSection={() => handleAddSection(section.id, 'right')}
              onDeleteSection={() => handleDeleteSection(section.id, 'right', index)}
              setFocusedSection={setFocusedSection}
            />
          ))}
        </main>
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={mainPageRef}
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

        {renderPage(pages[0]?.leftSections || [], pages[0]?.rightSections || [], 0)}
      </div>

      {pages.slice(1).map((page, index) => renderPage(page.leftSections, page.rightSections, index + 1))}
    </>
  );
}
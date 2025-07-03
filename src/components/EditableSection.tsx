import React, { useState, useRef } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

// Hàm debounce để trì hoãn cập nhật state
const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Định nghĩa kiểu cho nội dung của section
type SectionContent =
    | string // cho type="text"
    | string[] // cho type="list"
    | { title?: string; institution?: string; details: string[] }[] // cho type="complex" (education)
    | { summary?: string; items: { title: string; details: string[] }[]; additionalNote?: string }; // cho experiences

// Định nghĩa kiểu cho data của CVTemplate2
interface CVData {
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
}

interface EditableSectionProps {
    sectionKey: keyof CVData;
    title: string;
    content?: SectionContent;
    defaultContent: SectionContent;
    type: 'text' | 'list' | 'complex';
    onContentChange: (key: keyof CVData, value: any) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    selectedFont: string;
    selectedColor?: string;
    onAddSection?: (key: keyof CVData, index?: number) => void;
    onDeleteSection?: (key: keyof CVData, index?: number) => void;
}

export default function EditableSection({
    sectionKey,
    title,
    content,
    defaultContent,
    type,
    onContentChange,
    onKeyDown,
    selectedFont,
    selectedColor,
    onAddSection,
    onDeleteSection,
}: EditableSectionProps) {
    const [focusedSection, setFocusedSection] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Hàm lưu vị trí con trỏ
    const saveCursorPosition = (element: HTMLElement, key: string) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            return { startContainer: range.startContainer, startOffset: range.startOffset };
        }
        return null;
    };

    // Hàm khôi phục vị trí con trỏ
    const restoreCursorPosition = (element: HTMLElement, position: any) => {
        if (position && element.contains(position.startContainer)) {
            const range = document.createRange();
            try {
                range.setStart(position.startContainer, position.startOffset);
                range.collapse(true);
                const selection = window.getSelection();
                selection?.removeAllRanges();
                selection?.addRange(range);
            } catch (error) {
                console.warn('Không thể khôi phục vị trí con trỏ:', error);
            }
        }
    };

    // Xử lý thay đổi tiêu đề
    const handleTitleChange = (e: React.FocusEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent?.trim() || title;
        let newContent: any;

        if (type === 'text') {
            newContent = { title: text, content: typeof content === 'string' ? content : defaultContent };
        } else if (type === 'list') {
            newContent = { title: text, items: Array.isArray(content) ? content : defaultContent };
        } else if (type === 'complex') {
            if (sectionKey === 'experiences') {
                const expContent = content as { summary?: string; items: { title: string; details: string[] }[]; additionalNote?: string } | undefined;
                newContent = {
                    title: text,
                    summary: expContent?.summary || (defaultContent as any)?.summary || '',
                    items: expContent?.items || (defaultContent as any)?.items || [],
                    additionalNote: expContent?.additionalNote || (defaultContent as any)?.additionalNote || '',
                };
            } else {
                newContent = { title: text, items: Array.isArray(content) ? content : defaultContent };
            }
        }

        onContentChange(sectionKey, newContent);
    };

    // Xử lý thay đổi nội dung với debounce
    const handleContentChange = debounce((e: React.FormEvent<HTMLDivElement>) => {
        try {
            const element = e.currentTarget;
            const contentHtml = element.innerHTML;
            const parser = new DOMParser();
            const doc = parser.parseFromString(contentHtml, 'text/html');
            let newContent: any = {};

            if (type === 'text') {
                const contentElement = doc.querySelector('p') || doc.body;
                const contentText = contentElement.textContent?.trim() || '';
                newContent = { title, content: contentText };
            } else if (type === 'list') {
                const listItems = Array.from(doc.querySelectorAll('li'));
                const items = listItems
                    .map((li) => li.textContent?.trim() || '')
                    .filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-');
                newContent = { title, items };
            } else if (type === 'complex') {
                const items = Array.from(doc.querySelectorAll('.complex-item'))
                    .map((item) => {
                        const itemTitle = item.querySelector('h3')?.textContent?.trim() || '';
                        const detailItems = Array.from(item.querySelectorAll('li'));
                        const details = detailItems
                            .map((li) => li.textContent?.trim() || '')
                            .filter((text) => text !== '' && text !== '•' && text !== '·' && text !== '-');
                        return sectionKey === 'education'
                            ? { institution: itemTitle, details }
                            : { title: itemTitle, details };
                    })
                    .filter((item) => {
                        const titleOrInstitution = item.title ?? item.institution ?? '';
                        return titleOrInstitution.trim() !== '' || item.details.length > 0;
                    });

                if (sectionKey === 'experiences') {
                    newContent = {
                        title,
                        summary: doc.querySelector('p.font-medium')?.textContent?.trim() || '',
                        items,
                        additionalNote: doc.querySelector('p.italic')?.textContent?.trim() || '',
                    };
                } else {
                    newContent = { title, items };
                }
            }

            if (Object.keys(newContent).length > 0) {
                console.log('Cập nhật dữ liệu:', sectionKey, newContent);
                onContentChange(sectionKey, newContent);
            }
        } catch (error) {
            console.error('Lỗi khi xử lý thay đổi nội dung:', error);
        }
    }, 300);

    // Xử lý focus
    const handleFocus = (section: string) => {
        setFocusedSection(section);
    };

    // Render danh sách
    const renderList = (items: string[] | undefined, defaultItems: string[], listType = 'ul') => {
        const listItems = items?.length ? items : defaultItems;
        const listTag = listType === 'ol' ? 'ol' : 'ul';
        const listClass = listType === 'ol' ? 'list-decimal list-inside text-sm space-y-1' : 'list-disc list-inside text-sm space-y-1';
        return `<${listTag} class="${listClass}">${listItems.map((item) => `<li>${item}</li>`).join('')}</${listTag}>`;
    };

    // Render mục phức tạp (kinh nghiệm, học vấn)
    const renderComplexItems = (
        items: { title?: string; institution?: string; details: string[] }[] | undefined,
        defaultItems: { title?: string; institution?: string; details: string[] }[]
    ) => {
        if (items?.length) {
            return items.map((item, index) => {
                const details = item.details?.length ? item.details : defaultItems[0].details;
                const itemTitle = item.title || item.institution || 'Mục mới';
                return `<div class="mt-3 complex-item relative">
          ${focusedSection === `${sectionKey}-${index}` ? `
            <div class="absolute top-0 right-0 flex gap-2">
              <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => onAddSection?.('${sectionKey}', ${index})}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </button>
              <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => onDeleteSection?.('${sectionKey}', ${index})}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              </button>
            </div>
          ` : ''}
          <h3 class="text-lg font-medium text-gray-700">${itemTitle}</h3>
          ${renderList(details, defaultItems[0].details, 'ul')}
        </div>`;
            }).join('');
        }
        return defaultItems.map((item, index) => {
            const itemTitle = item.title || item.institution || 'Mục mới';
            return `<div class="mt-3 complex-item relative">
        ${focusedSection === `${sectionKey}-${index}` ? `
          <div class="absolute top-0 right-0 flex gap-2">
            <button class="p-1 bg-gray-200 rounded hover:bg-gray-300" onclick="event.stopPropagation();" onClick={() => onAddSection?.('${sectionKey}', ${index})}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button class="p-1 bg-red-200 rounded hover:bg-red-300" onclick="event.stopPropagation();" onClick={() => onDeleteSection?.('${sectionKey}', ${index})}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox "0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        ` : ''}
        <h3 class="text-lg font-medium text-gray-700">${itemTitle}</h3>
        ${renderList(item.details, item.details, 'ul')}
      </div>`;
        }).join('');
    };

    // Render nội dung dựa trên type
    const renderContent = () => {
        if (type === 'text') {
            return `<p class="text-gray-700">${(content as string) || defaultContent}</p>`;
        } else if (type === 'list') {
            return renderList(content as string[], defaultContent as string[], 'ul');
        } else if (type === 'complex') {
            let html = '';
            if (sectionKey === 'experiences') {
                const expContent = content as { summary?: string; items: { title: string; details: string[] }[]; additionalNote?: string } | undefined;
                html += `<p class="font-medium text-gray-700">${expContent?.summary || (defaultContent as any)?.summary || ''}</p>`;
                html += renderComplexItems(expContent?.items, (defaultContent as any)?.items || []);
                html += `<p class="mt-2 text-sm italic text-gray-700">${expContent?.additionalNote || (defaultContent as any)?.additionalNote || ''}</p>`;
            } else {
                html += renderComplexItems(content as { institution: string; details: string[] }[], defaultContent as { institution: string; details: string[] }[]);
            }
            return html;
        }
        return '';
    };

    return (
        <section className="mb-6 relative" style={{ fontFamily: selectedFont }}>
            <h2
                className={`text-${type === 'complex' ? 'xl' : 'lg'} font-semibold border-b border-gray-${type === 'complex' ? '500' : '400'} pb-1 mb-2`}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={onKeyDown}
                onFocus={() => handleFocus(sectionKey)}
                onBlur={handleTitleChange}
            >
                {title}
            </h2>
            {focusedSection === sectionKey && (onAddSection || onDeleteSection) && (
                <div className="absolute top-0 right-0 flex gap-2">
                    {onAddSection && (
                        <button className="p-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => onAddSection(sectionKey, undefined)}>
                            <FiPlus className="h-4 w-4" />
                        </button>
                    )}
                    {onDeleteSection && (
                        <button className="p-1 bg-red-200 rounded hover:bg-red-300" onClick={() => onDeleteSection(sectionKey, undefined)}>
                            <FiTrash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            )}
            <div
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                className="text-sm text-gray-700"
                onInput={(e) => {
                    const position = saveCursorPosition(e.currentTarget, sectionKey);
                    handleContentChange(e);
                    if (position) setTimeout(() => restoreCursorPosition(e.currentTarget, position), 0);
                }}
                onKeyDown={onKeyDown}
                onFocus={() => handleFocus(sectionKey)}
                style={{ color: selectedColor }}
                dangerouslySetInnerHTML={{ __html: renderContent() }}
            />
        </section>
    );
}
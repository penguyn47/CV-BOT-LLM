import React, { useState, useRef, useEffect, useMemo } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

interface EditableSectionProps {
    sectionKey: string;
    title: string;
    content: string;
    defaultContent: string;
    onContentChange: (key: string, value: { title: string; content: string }) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    selectedFont: string;
    selectedColor?: string;
    onAddSection?: () => void;
    onDeleteSection?: () => void;
    setFocusedSection: (sectionKey: string | null) => void;
}

export default function EditableSection({
    sectionKey,
    title,
    content,
    defaultContent,
    onContentChange,
    onKeyDown,
    selectedFont,
    selectedColor,
    onAddSection,
    onDeleteSection,
    setFocusedSection,
}: EditableSectionProps) {
    const [focusedSection, setLocalFocusedSection] = useState<string | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    const handleTitleChange = (e: React.FocusEvent<HTMLDivElement>) => {
        const text = e.currentTarget.textContent?.trim() || title;
        onContentChange(sectionKey, { title: text, content });
    };

    const handleContentChange = debounce((e: React.FormEvent<HTMLDivElement>) => {
        try {
            const element = e.currentTarget;
            if (!element) {
                console.warn('Element is null in handleContentChange');
                return;
            }
            const contentText = element.innerHTML.trim() || defaultContent;
            onContentChange(sectionKey, { title, content: contentText });
            console.log('Cập nhật dữ liệu:', sectionKey, { title, content: contentText });
        } catch (error) {
            console.error('Lỗi khi xử lý thay đổi nội dung:', error);
        }
    }, 300);

    const handleFocus = () => {
        setLocalFocusedSection(sectionKey);
        setFocusedSection(sectionKey);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (sectionRef.current && !sectionRef.current.contains(e.target as Node)) {
            setLocalFocusedSection(null);
            setFocusedSection(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Memoize renderContent để tránh tái render không cần thiết
    const renderedContent = useMemo(() => {
        if (!content || content === defaultContent) {
            return (
                <div className="text-sm text-gray-700" style={{ color: selectedColor }}>
                    {content || defaultContent}
                </div>
            );
        }

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const list = doc.querySelector('ul') || doc.querySelector('ol');
            const heading = doc.querySelector('h3');

            if (list) {
                const items = Array.from(list.children).map((li, index) => (
                    <li key={index}>{li.textContent}</li>
                ));
                return list.tagName === 'UL' ? (
                    <ul className="text-sm text-gray-700" style={{ color: selectedColor }}>
                        {items}
                    </ul>
                ) : (
                    <ol className="text-sm text-gray-700" style={{ color: selectedColor }}>
                        {items}
                    </ol>
                );
            } else if (heading) {
                return (
                    <div className="text-sm text-gray-700" style={{ color: selectedColor }}>
                        <h3>{heading.textContent}</h3>
                        {Array.from(doc.body.children)
                            .filter((child) => child !== heading)
                            .map((child, index) => (
                                <div key={index} dangerouslySetInnerHTML={{ __html: child.outerHTML }} />
                            ))}
                    </div>
                );
            }
        } catch (error) {
            console.error('Lỗi khi parse HTML:', error);
        }

        return (
            <div className="text-sm text-gray-700" style={{ color: selectedColor }}>
                {content}
            </div>
        );
    }, [content, defaultContent, selectedColor]);

    return (
        <section className="mb-6 relative" style={{ fontFamily: selectedFont }} ref={sectionRef}>
            <h2
                className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
                contentEditable
                suppressContentEditableWarning
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                onBlur={handleTitleChange}
            >
                {title}
            </h2>
            {focusedSection === sectionKey && (onAddSection || onDeleteSection) && (
                <div className="absolute top-0 right-0 flex gap-2">
                    {onAddSection && (
                        <button className="p-1 bg-gray-200 rounded hover:bg-gray-300" onClick={onAddSection}>
                            <FiPlus className="h-4 w-4" />
                        </button>
                    )}
                    {onDeleteSection && (
                        <button className="p-1 bg-red-200 rounded hover:bg-red-300" onClick={onDeleteSection}>
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
                onInput={handleContentChange}
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                style={{ color: selectedColor }}
            >
                {renderedContent}
            </div>
        </section>
    );
}
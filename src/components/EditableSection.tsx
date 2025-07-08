import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

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
    const [isClickingButton, setIsClickingButton] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const buttonsContainerRef = useRef<HTMLDivElement>(null);
    const tempTitleRef = useRef(title); // Khai báo useRef ở đây

    const handleTitleChange = useCallback(
        (e: React.FormEvent<HTMLDivElement>) => {
            const element = e.currentTarget;
            const text = element.textContent?.trim() || title;
            tempTitleRef.current = text; // Lưu giá trị tạm thời
        },
        [sectionKey, title]
    );

    const handleTitleBlur = useCallback(() => {
        if (tempTitleRef.current !== title) {
            onContentChange(sectionKey, { title: tempTitleRef.current, content });
        }
    }, [sectionKey, title, content, onContentChange]);

    const handleContentChange = useCallback(
        (e: React.FormEvent<HTMLDivElement>) => {
            console.log('handleContentChange executed:', e);
            try {
                const element = e.currentTarget;
                console.log('Element:', element);
                if (!element) {
                    console.warn('Element is null in handleContentChange');
                    return;
                }
                const contentText = element.innerHTML
                    .replace(/^<div[^>]*>|<\/div>$/g, '')
                    .trim() || defaultContent;
                console.log('Calling onContentChange:', { sectionKey, title, content: contentText });
                onContentChange(sectionKey, { title, content: contentText });
                console.log('Cập nhật dữ liệu:', sectionKey, { title, content: contentText });
            } catch (error) {
                console.error('Lỗi khi xử lý thay đổi nội dung:', error);
            }
        },
        [sectionKey, title, defaultContent, onContentChange]
    );

    const handleFocus = useCallback(() => {
        console.log('handleFocus called for section:', sectionKey);
        setLocalFocusedSection(sectionKey);
        setFocusedSection(sectionKey);
    }, [sectionKey, setFocusedSection]);

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            console.log('handleClickOutside triggered', {
                target: e.target,
                sectionRef: sectionRef.current,
                buttonsContainerRef: buttonsContainerRef.current,
            });

            if (
                sectionRef.current &&
                !sectionRef.current.contains(e.target as Node) &&
                buttonsContainerRef.current &&
                !buttonsContainerRef.current.contains(e.target as Node)
            ) {
                console.log('Setting focusedSection to null');
                setLocalFocusedSection(null);
                setFocusedSection(null);
            } else {
                console.log('Click ignored, target is within section or buttons');
            }
        },
        [setFocusedSection]
    );

    useEffect(() => {
        console.log('Adding click listener');
        document.addEventListener('click', handleClickOutside);
        return () => {
            console.log('Removing click listener');
            document.removeEventListener('click', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleButtonMouseDown = useCallback((e: React.MouseEvent) => {
        console.log('Button mousedown, stopping propagation');
        e.stopPropagation();
        setIsClickingButton(true);
    }, []);

    const handleButtonClick = useCallback((action: () => void) => {
        console.log('Button clicked for section:', sectionKey);
        action();
        setTimeout(() => setIsClickingButton(false), 0);
    }, [sectionKey]);

    useEffect(() => {
        if (contentRef.current) {
            console.log('Initializing contentEditable with:', content || defaultContent);
            contentRef.current.innerHTML = content || defaultContent;
        }
    }, []);

    useEffect(() => {
        console.log('EditableSection re-rendered:', { sectionKey, title, content, selectedColor });
    }, [sectionKey, title, content, selectedColor]);

    return (
        <section className="mb-6 relative" style={{ fontFamily: selectedFont }} ref={sectionRef}>
            <h2
                className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
                contentEditable
                suppressContentEditableWarning
                onInput={handleTitleChange}
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                onBlur={handleTitleBlur} // Gắn handleTitleBlur
            >
                {title}
            </h2>
            {focusedSection === sectionKey && (onAddSection || onDeleteSection) && (
                <div className="absolute top-0 right-0 flex gap-2" ref={buttonsContainerRef}>
                    {onAddSection && (
                        <button
                            className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            onMouseDown={handleButtonMouseDown}
                            onClick={() => handleButtonClick(onAddSection)}
                        >
                            <FiPlus className="h-4 w-4" />
                        </button>
                    )}
                    {onDeleteSection && (
                        <button
                            className="p-1 bg-red-200 rounded hover:bg-red-300"
                            onMouseDown={handleButtonMouseDown}
                            onClick={() => handleButtonClick(onDeleteSection)}
                        >
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
                    console.log('onInput triggered:', e.currentTarget.innerHTML);
                    handleContentChange(e);
                }}
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                onBlur={() => {
                    if (!isClickingButton) {
                        console.log('Content blurred, setting focusedSection to null');
                        setLocalFocusedSection(null);
                        setFocusedSection(null);
                    } else {
                        console.log('Content blurred, but ignored due to button click');
                    }
                }}
                style={{ color: selectedColor }}
            />
        </section>
    );
}
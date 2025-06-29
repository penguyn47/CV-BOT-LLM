import React, { useState, useRef } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

interface EditableSectionProps {
    sectionId: string;
    sectionIndex: number;
    title: string;
    content: string;
    onContentChange: (id: string, content: { title: string; content: string }) => void;
    onAddSection: (index: number) => void;
    onDeleteSection: (id: string) => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
}

export default function EditableSection({
    sectionId,
    sectionIndex,
    title,
    content,
    onContentChange,
    onAddSection,
    onDeleteSection,
    handleKeyDown,
}: EditableSectionProps) {
    const [isFocused, setIsFocused] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Hàm lưu vị trí con trỏ
    const saveCursorPosition = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0 && contentRef.current) {
            const range = selection.getRangeAt(0);
            return { startContainer: range.startContainer, startOffset: range.startOffset };
        }
        return null;
    };

    // Hàm khôi phục vị trí con trỏ
    const restoreCursorPosition = (position: any) => {
        if (position && contentRef.current) {
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

    // Hàm xử lý thay đổi nội dung
    const handleContentChangeDebounced = (e: React.FormEvent<HTMLDivElement>) => {
        const position = saveCursorPosition();
        const contentText = e.currentTarget.textContent?.trim() || '';
        onContentChange(sectionId, { title, content: contentText });
        setTimeout(() => restoreCursorPosition(position), 0);
    };

    // Hàm xử lý thay đổi tiêu đề
    const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
        const titleText = e.currentTarget.textContent?.trim() || '';
        onContentChange(sectionId, { title: titleText, content });
    };

    return (
        <section
            className="mb-6 relative"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        >
            {/* Nút + và thùng rác */}
            {isFocused && (
                <div className="absolute top-0 right-0 flex gap-2">
                    <button
                        className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => onAddSection(sectionIndex)}
                    >
                        <FaPlus className="h-4 w-4" />
                    </button>
                    <button
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => onDeleteSection(sectionId)}
                    >
                        <FaTrash className="h-4 w-4" />
                    </button>
                </div>
            )}
            <h2
                className="text-lg font-semibold border-b border-gray-400 pb-1 mb-2"
                contentEditable
                suppressContentEditableWarning
                onKeyDown={handleKeyDown}
                onInput={handleTitleChange}
            >
                {title}
            </h2>
            <div
                ref={contentRef}
                contentEditable
                suppressContentEditableWarning
                className="text-sm text-gray-700"
                onInput={handleContentChangeDebounced}
                onKeyDown={handleKeyDown}
                dangerouslySetInnerHTML={{
                    __html: `<p class="text-gray-700">${content || 'Nhập nội dung tại đây...'}</p>`,
                }}
            />
        </section>
    );
}
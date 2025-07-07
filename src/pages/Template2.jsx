import React, { useState, useEffect, useRef } from 'react';
import {
	FaPhone,
	FaFax,
	FaEnvelope,
	FaFacebook,
	FaInstagram,
	FaMapMarkerAlt,
	FaBirthdayCake,
	FaAddressBook,
	FaAddressCard,
	FaUser,
	FaSchool,
} from 'react-icons/fa';
import { IoCall, IoMail, IoCalendar, IoLocation } from 'react-icons/io5';

export default function CVTemplate({ data, onContentChange, selectedFont, selectedColor }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [focusedSection, setFocusedSection] = useState(null);
	const sectionRef = useRef(null);

	const togglePage = () => {
		setCurrentPage(currentPage === 1 ? 2 : 1);
	};

	const handleClickOutside = (e) => {
		if (sectionRef.current && !sectionRef.current.contains(e.target)) {
			setFocusedSection(null);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const MapPin = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
	);

	const Phone = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
		</svg>
	);

	const Mail = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="mr-2"
		>
			<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
			<polyline points="22,6 12,13 2,6" />
		</svg>
	);

	if (!data) {
		console.error('Dữ liệu CV không tồn tại');
		return <div className="p-4 text-red-500">Lỗi: Dữ liệu CV không tồn tại</div>;
	}

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

	const handleTitleChange = (key, e) => {
		try {
			const title = e.currentTarget.textContent.trim() || data[key].title;
			onContentChange(key, { ...data[key], title });
		} catch (error) {
			console.error('Lỗi khi thay đổi tiêu đề:', error);
		}
	};

	const handleContentChange = (key, e) => {
		try {
			if (!e.currentTarget) {
				console.warn(`currentTarget is null for ${key}, skipping content change`);
				return;
			}
			const content = e.currentTarget.innerHTML.trim();
			const parser = new DOMParser();
			const doc = parser.parseFromString(content, 'text/html');
			let newContent = {};

			if (key === 'objective') {
				const contentElement = doc.querySelector('p') || doc.body;
				const contentText = contentElement.textContent.trim() || data[key].content;
				newContent = { ...data[key], content: contentText };
			} else if (['expertise', 'otherSkills', 'hobbies', 'certificates'].includes(key)) {
				const listItems = Array.from(doc.querySelectorAll('li'));
				const items = listItems
					.map((li) => li.textContent.trim())
					.filter((text) => text && !['•', '·', '-', ''].includes(text));
				newContent = { ...data[key], items: items.length > 0 ? items : data[key].items || [] };
			} else if (key === 'publicActivity') {
				const activityItems = Array.from(doc.querySelectorAll('.mb-4'));
				const items = activityItems
					.map((item) => {
						const name = item.querySelector('h3')?.textContent.trim() || '';
						const detailItems = Array.from(item.querySelectorAll('li'));
						const description = detailItems
							.map((li) => li.textContent.trim())
							.filter((text) => text && !['•', '·', '-', ''].includes(text));
						return { name, description };
					})
					.filter((item) => item.name.trim() || item.description.length > 0);
				newContent = { ...data[key], items: items.length > 0 ? items : data[key].items || [] };
			} else if (key === 'experiences') {
				const summaryElement = doc.querySelector('p.font-medium');
				const additionalNoteElement = doc.querySelector('p.italic');
				const experienceItems = Array.from(doc.querySelectorAll('.experience-item'));
				const items = experienceItems
					.map((item) => {
						const title = item.querySelector('h3')?.textContent.trim() || '';
						const detailItems = Array.from(item.querySelectorAll('li'));
						const details = detailItems
							.map((li) => li.textContent.trim())
							.filter((text) => text && !['•', '·', '-', ''].includes(text));
						return { title, details };
					})
					.filter((item) => item.title.trim() || item.details.length > 0);
				newContent = {
					...data[key],
					summary: summaryElement ? summaryElement.textContent.trim() : data[key]?.summary || '',
					items: items.length > 0 ? items : data[key].items || [],
					additionalNote: additionalNoteElement ? additionalNoteElement.textContent.trim() : data[key]?.additionalNote || '',
				};
			} else if (key === 'education') {
				const educationItems = Array.from(doc.querySelectorAll('.education-item'));
				const items = educationItems
					.map((item) => {
						const institution = item.querySelector('h3')?.textContent.trim() || '';
						const detailItems = Array.from(item.querySelectorAll('li'));
						const details = detailItems
							.map((li) => li.textContent.trim())
							.filter((text) => text && !['•', '·', '-', ''].includes(text));
						return { institution, details };
					})
					.filter((item) => item.institution.trim() || item.details.length > 0);
				newContent = { ...data[key], items: items.length > 0 ? items : data[key].items || [] };
			}

			if (Object.keys(newContent).length > 0) {
				console.log('Cập nhật dữ liệu:', key, newContent);
				onContentChange(key, newContent);
			}
		} catch (error) {
			console.error(`Lỗi khi xử lý thay đổi nội dung cho ${key}:`, error);
		}
	};

	const handleContactChange = (field, value) => {
		try {
			const updatedContact = {
				...(data.contact || {}),
				[field]: value,
			};
			onContentChange('contact', updatedContact);
		} catch (error) {
			console.error('Lỗi khi thay đổi thông tin liên hệ:', error);
		}
	};

	const handleFocus = (e, sectionKey) => {
		const element = e.currentTarget;
		element.classList.remove('text-gray-400');
		setFocusedSection(sectionKey);
	};

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
					handleContentChange(key, e);
				}
			} else {
				if (field) {
					handleContactChange(field, text);
				} else if (key === 'name' || key === 'subtitle') {
					onContentChange(key, text);
				} else {
					handleContentChange(key, e);
				}
			}
		} catch (error) {
			console.error('Lỗi khi xử lý blur:', error);
		}
	};

	const renderList = (items, defaultItems, listType = 'ul', className = 'list-disc list-inside text-sm space-y-1 ml-0') => {
		const listItems = Array.isArray(items) && items.length > 0 ? items : defaultItems;
		const listTag = listType === 'ol' ? 'ol' : 'ul';
		const listClass = listType === 'ol' ? 'list-decimal list-inside text-sm space-y-1 ml-0' : className;
		return React.createElement(
			listTag,
			{ className: listClass, style: { marginLeft: 0 } },
			listItems.map((item, idx) => React.createElement('li', { key: idx }, item))
		);
	};

	const renderEducationItems = (items, defaultItems) => {
		if (Array.isArray(items) && items.length > 0) {
			return items.map((edu, index) => (
				<div key={index} className="education-item relative" data-index={index}>
					<h3
						className="text-lg font-medium text-gray-700"
						contentEditable
						suppressContentEditableWarning
						onBlur={(e) => handleTitleChange('education', e)}
						onFocus={(e) => handleFocus(e, `education-${index}`)}
					>
						{edu.institution || 'Đại học Kinh tế Quốc dân'}
					</h3>
					<div
						contentEditable
						suppressContentEditableWarning
						className="text-sm text-gray-700"
						onBlur={(e) => handleContentChange('education', e)}
						onFocus={(e) => handleFocus(e, `education-${index}`)}
						onKeyDown={handleKeyDown}
					>
						{renderList(
							edu.details,
							['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'],
							'ul',
							'list-disc list-inside text-sm mt-1'
						)}
					</div>
				</div>
			));
		}
		return (
			<div className="education-item relative" data-index="0">
				<h3
					className="text-lg font-medium text-gray-700"
					contentEditable
					suppressContentEditableWarning
					onBlur={(e) => handleTitleChange('education', e)}
					onFocus={(e) => handleFocus(e, 'education-0')}
				>
					Đại học Kinh tế Quốc dân
				</h3>
				<div
					contentEditable
					suppressContentEditableWarning
					className="text-sm text-gray-700"
					onBlur={(e) => handleContentChange('education', e)}
					onFocus={(e) => handleFocus(e, 'education-0')}
					onKeyDown={handleKeyDown}
				>
					{renderList(
						[],
						['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'],
						'ul',
						'list-disc list-inside text-sm mt-1'
					)}
				</div>
			</div>
		);
	};

	const renderExperienceItems = (items, defaultItems) => {
		if (Array.isArray(items) && items.length > 0) {
			return items.map((exp, index) => (
				<div key={index} className="experience-item relative" data-index={index}>
					<h3
						className="text-lg font-medium text-gray-700"
						contentEditable
						suppressContentEditableWarning
						onBlur={(e) => handleTitleChange('experiences', e)}
						onFocus={(e) => handleFocus(e, `experiences-${index}`)}
					>
						{exp.title || 'Nhân viên kinh doanh'}
					</h3>
					<div
						contentEditable
						suppressContentEditableWarning
						className="text-sm text-gray-700"
						onBlur={(e) => handleContentChange('experiences', e)}
						onFocus={(e) => handleFocus(e, `experiences-${index}`)}
						onKeyDown={handleKeyDown}
					>
						{renderList(
							exp.details,
							['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'],
							'ul',
							'list-disc list-inside text-sm mt-1'
						)}
					</div>
				</div>
			));
		}
		return (
			<div className="experience-item relative" data-index="0">
				<h3
					className="text-lg font-medium text-gray-700"
					contentEditable
					suppressContentEditableWarning
					onBlur={(e) => handleTitleChange('experiences', e)}
					onFocus={(e) => handleFocus(e, 'experiences-0')}
				>
					Nhân viên kinh doanh
				</h3>
				<div
					contentEditable
					suppressContentEditableWarning
					className="text-sm text-gray-700"
					onBlur={(e) => handleContentChange('experiences', e)}
					onFocus={(e) => handleFocus(e, 'experiences-0')}
					onKeyDown={handleKeyDown}
				>
					{renderList(
						[],
						['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'],
						'ul',
						'list-disc list-inside text-sm mt-1'
					)}
				</div>
			</div>
		);
	};

	const contactItems = [
		{ key: 'phone', icon: <IoCall className="mr-2 mt-1" />, placeholder: '+84 123 456 789' },
		{ key: 'email', icon: <IoMail className="mr-2 mt-1" />, placeholder: 'example@gmail.com' },
		{ key: 'birthday', icon: <IoCalendar className="mr-2 mt-1" />, placeholder: '24/12/2003' },
		{
			key: 'location',
			icon: <IoLocation style={{ width: '28px', height: '28px', marginLeft: '-4px', marginRight: '6px', marginTop: '4px' }} />,
			placeholder: '123 Đường ABC, Quận 1, TP.HCM'
		},
	];

	const referencesItems = [
		{ key: 'name', icon: <FaUser className="mr-2 mt-1" />, placeholder: 'Tên người tham chiếu' },
		{ key: 'address', icon: <FaSchool className="mr-2 mt-1" />, placeholder: 'Địa chỉ' },
		{ key: 'phone', icon: <FaPhone className="mr-2 mt-1" />, placeholder: '+84 123 456 789' },
		{ key: 'email', icon: <FaAddressCard className="mr-2 mt-1" />, placeholder: 'example@gmail.com' },
	];

	return (
		<>
			<style jsx="true" global="true">{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        body {
          font-family: '${selectedFont}', sans-serif;
        }
        ul, ol {
          margin-left: 0 !important;
        }
      `}</style>
			<div
				className="min-h-[297mm] bg-white w-[210mm] mx-auto shadow-lg print:shadow-none"
				style={{ aspectRatio: '210 / 297', fontFamily: selectedFont }}
				ref={sectionRef}
			>
				<div className="flex flex-col md:flex-row w-full h-full">
					<div className="w-full md:w-1/3 bg-slate-400 p-6 text-slate-800" style={{ backgroundColor: selectedColor }}>
						<div className="mb-8">
							<h1
								className="text-4xl font-bold uppercase"
								contentEditable
								suppressContentEditableWarning
								onFocus={(e) => handleFocus(e, 'name')}
								onBlur={(e) => handleBlur(e, 'Họ và Tên', 'name')}
							>
								{data.name || 'Họ và Tên'}
							</h1>
							<div className="border-t-2 border-slate-600 w-12 mt-2"></div>
						</div>

						<ul className="mb-8 relative ml-0 pl-0" style={{ marginLeft: '0', paddingLeft: '0' }}>
							{contactItems.map(({ key, icon, placeholder }) => (
								<li
									key={`contact-${key}`}
									className="flex items-start ml-0 pl-0"
									contentEditable
									suppressContentEditableWarning
									onFocus={(e) => handleFocus(e, `contact-${key}`)}
									onBlur={(e) => handleBlur(e, placeholder, 'contact', key)}
								>
									{icon}
									<span className="flex items-center gap-2">{data.contact?.[key] || placeholder}</span>
								</li>
							))}
						</ul>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'education')}
								onBlur={(e) => handleTitleChange('education', e)}
							>
								{data.education.title || 'Học vấn'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('education', e)}
								onFocus={(e) => handleFocus(e, 'education')}
								onKeyDown={handleKeyDown}
							>
								{renderEducationItems(data.education.items, ['Cử nhân Quản trị Kinh doanh, 2018-2022', 'GPA 3.5/4.0'])}
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'certificates')}
								onBlur={(e) => handleTitleChange('certificates', e)}
							>
								{data.certificates.title || 'Chứng chỉ'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('certificates', e)}
								onFocus={(e) => handleFocus(e, 'certificates')}
								onKeyDown={handleKeyDown}
							>
								<ul className="list-disc list-inside space-y-1">
									{data.certificates.items?.map((language, idx) => (
										<li key={idx}>{language}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'otherSkills')}
								onBlur={(e) => handleTitleChange('otherSkills', e)}
							>
								{data.otherSkills.title || 'Kỹ năng mềm'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('otherSkills', e)}
								onFocus={(e) => handleFocus(e, 'otherSkills')}
								onKeyDown={handleKeyDown}
							>
								<ul className="list-disc list-inside space-y-1">
									{data.otherSkills.items?.map((skill, idx) => (
										<li key={idx}>{skill}</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'hobbies')}
								onBlur={(e) => handleTitleChange('hobbies', e)}
							>
								{data.hobbies.title || 'Sở thích'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('hobbies', e)}
								onFocus={(e) => handleFocus(e, 'hobbies')}
								onKeyDown={handleKeyDown}
							>
								<ul className="list-disc list-inside space-y-1">
									{data.hobbies.items?.map((hobby, idx) => (
										<li key={idx}>{hobby}</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="w-full md:w-2/3 bg-gray-50 p-6">
						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'objective')}
								onBlur={(e) => handleTitleChange('objective', e)}
							>
								{data.objective.title || 'Tóm tắt cá nhân'}
							</h2>
							<p
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('objective', e)}
								onFocus={(e) => handleFocus(e, 'objective')}
								onKeyDown={handleKeyDown}
							>
								{data.objective.content}
							</p>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'expertise')}
								onBlur={(e) => handleTitleChange('expertise', e)}
							>
								{data.expertise.title || 'Kỹ năng cốt lõi'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('expertise', e)}
								onFocus={(e) => handleFocus(e, 'expertise')}
								onKeyDown={handleKeyDown}
							>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
									<ul className="list-disc pl-5">
										{data.expertise.items?.map((skill, idx) =>
											idx < Math.ceil(data.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
										)}
									</ul>
									<ul className="list-disc pl-5">
										{data.expertise.items?.map((skill, idx) =>
											idx >= Math.ceil(data.expertise.items.length / 2) ? <li key={idx}>{skill}</li> : null
										)}
									</ul>
								</div>
							</div>
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'experiences')}
								onBlur={(e) => handleTitleChange('experiences', e)}
							>
								{data.experiences[0].title || 'Kinh nghiệm chuyên môn'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('experiences', e)}
								onFocus={(e) => handleFocus(e, 'experiences')}
								onKeyDown={handleKeyDown}
							>
								{renderExperienceItems(data.experiences[0].items, ['Quản lý danh mục khách hàng', 'Đạt doanh số 500 triệu/tháng'])}
							</div>
							{data.experiences[0].additionalNote && (
								<p
									className="italic text-sm text-gray-600 mt-2"
									contentEditable
									suppressContentEditableWarning
									onKeyDown={handleKeyDown}
									onFocus={(e) => handleFocus(e, 'experiences')}
									onBlur={(e) => handleContentChange('experiences', e)}
								>
									{data.experiences[0].additionalNote}
								</p>
							)}
						</div>

						<div className="mb-8 relative">
							<h2
								className="text-xl font-semibold uppercase mb-2"
								contentEditable
								suppressContentEditableWarning
								onKeyDown={handleKeyDown}
								onFocus={(e) => handleFocus(e, 'publicActivity')}
								onBlur={(e) => handleTitleChange('publicActivity', e)}
							>
								{data.publicActivity.title || 'Hoạt động xã hội'}
							</h2>
							<div
								contentEditable
								suppressContentEditableWarning
								className="text-sm text-gray-700"
								onBlur={(e) => handleContentChange('publicActivity', e)}
								onFocus={(e) => handleFocus(e, 'publicActivity')}
								onKeyDown={handleKeyDown}
							>
								{data.publicActivity?.items?.map((exp, idx) => (
									<div key={idx} className="mb-4">
										<h3
											className="text-[15px]"
											contentEditable
											suppressContentEditableWarning
											onBlur={(e) => handleContentChange('publicActivity', e)}
											onFocus={(e) => handleFocus(e, 'publicActivity')}
										>
											{exp.name}
										</h3>
										<ul className="list-disc list-inside mt-2">
											{exp.description?.map((duty, i) => (
												<li key={i}>{duty}</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
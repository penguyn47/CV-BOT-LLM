import { useRef, useState } from 'react'

function CVPreview() {
	const [selectedColor, setSelectedColor] = useState(null)
	const printRef = useRef(null)

	const colors = [
		{ name: 'Red', value: '#EF4444' },
		{ name: 'Green', value: '#10B981' },
		{ name: 'Blue', value: '#3B82F6' },
		{ name: 'Yellow', value: '#F59E0B' },
		{ name: 'Purple', value: '#8B5CF6' },
		{ name: 'Indigo', value: '#4F46E5' },
		{ name: 'Amber', value: '#F59E0B' },
		{ name: 'Emerald', value: '#047857' },
	]

	const handleColorSelect = (color) => {
		setSelectedColor(selectedColor?.name === color.name ? null : color)
	}

	return (
		<div className="flex">
			{/* CV SECTION */}
			<div className="flex mx-16 my-8 items-center justify-around w-2/3">
				<div
					ref={printRef}
					id="cv-container"
					className="flex w-[840px] h-[1188px] border"
					style={{ backgroundColor: selectedColor?.value || 'white' }}
				>
					{selectedColor?.value}
				</div>
			</div>
			{/* EDIT SECTION */}
			<div className="flex flex-col w-1/3 pr-16 mt-8">
				<div className="w-full">
					<div className="mb-2">Font</div>
					<select className="w-full h-fit p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
						<option value="">Chọn một tùy chọn</option>
						<option value="option1">Tùy chọn 1</option>
						<option value="option2">Tùy chọn 2</option>
						<option value="option3">Tùy chọn 3</option>
					</select>
					<div className="border my-4"></div>
				</div>
				<div className="w-full">
					<div className="mb-2">Ngôn ngữ</div>
					<select className="w-full h-fit p-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
						<option value="">Chọn một tùy chọn</option>
						<option value="option1">Tiếng Việt</option>
						<option value="option2">Tiếng Anh</option>
					</select>
					<div className="border my-4"></div>
					<div className="mb-2">Màu sắc</div>
					<div className="flex flex-wrap gap-4">
						{colors.map((color, index) => (
							<div
								key={color.name}
								className="relative w-8 h-8 border-2 border-gray-300 rounded-lg cursor-pointer transition-transform hover:scale-105"
								onClick={() => handleColorSelect(color)}
							>
								<div className="w-full h-full rounded-md" style={{ backgroundColor: color.value }}></div>
								{selectedColor === color.name && (
									<div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
										<svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
										</svg>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				<button className="mt-8 bg-blue-600 text-white py-3 px-4 text-xl text-center rounded-sm cursor-pointer hover:bg-blue-500">
					Dùng mẫu này
				</button>
			</div>
		</div>
	)
}

export default CVPreview

import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import data from '../../db/profile.json'

export default function MyProfileCVPage() {
	const navigate = useNavigate()
	const [isEditing, setIsEditing] = useState(false)
	const [avatarUrl, setAvatarUrl] = useState('./avatar.png')

	type SectionKey = keyof typeof infoFormData
	type FieldKey<T extends SectionKey> = keyof (typeof infoFormData)[T]
	const [infoFormData, setFormData] = useState(data)

	const handleNestedChange = <T extends SectionKey, K extends FieldKey<T>>(section: T, field: K, value: string) => {
		setFormData((prev) => ({
			...prev,
			[section]: {
				...prev[section],
				[field]: value,
			},
		}))
	}

	const handleSave = async (formData: typeof infoFormData) => {
		try {
			console.log(formData)
			const response = await fetch('http://localhost:5000/save-profile', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				const errorText = await response.text()
				throw new Error(`Lưu thất bại: ${errorText}`)
			}
			alert('Dữ liệu đã được lưu thành công vào db/profile.json!')
		} catch (error: any) {
			console.error('Lỗi khi lưu dữ liệu:', error)
			alert(`Lỗi khi lưu dữ liệu: ${error.message || 'Không xác định'}`)
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const imageUrl = URL.createObjectURL(file)
			setAvatarUrl(imageUrl)
		}
	}

	return (
		<div className="min-h-screen bg-white font-sans text-black">
			{/* Filter Bar */}
			<div className="flex gap-4 px-35 py-4 bg-gray-100">
				<button
					onClick={() => navigate('/recentcv')}
					className="flex items-center px-3 py-3  bg-white  rounded-md font-medium"
				>
					<img src="/clock.png" alt="Newest" className="w-6 mr-2" />
					Mới nhất
				</button>
				<button
					onClick={() => navigate('/mycv')}
					className="flex items-center px-3 py-3 bg-white rounded-md font-medium"
				>
					<img src="/cv_icon.png" alt="My CV" className="w-6 mr-2" />
					CV Của tôi
				</button>
				<button
					onClick={() => navigate('/myprofile')}
					className="flex items-center px-3 py-3 bg-blue-100 rounded-md font-medium"
				>
					<img src="/block.png" alt="Hồ sơ" className="w-6 mr-2" />
					Hồ sơ
				</button>
			</div>

			{/* CV Section */}
			<section className="mx-20 my-8 p-6 mx-35 bg-white border border-black rounded-lg">
				<h3 className="text-xl font-semibold mb-2">Thông tin cá nhân</h3>
				<p className="text-sm text-gray-600 mb-6 -mt-1 mb-10">Cập nhật thông tin cá nhân để cải thiện CV của bạn.</p>

				<div className="flex items-center border-b border-gray-300 pb-4 mb-6 item-center">
					<img className="w-24 h-24 rounded-full object-cover mr-6" src={avatarUrl} alt="Avatar" />
					<div>
						<div className="font-bold text-lg mb-2 ">Phạm Thanh Phong</div>
						<div className="text-gray-700 mb-5">ptphong@gmail.com</div>
						<label htmlFor="avatarInput" className="cursor-pointer border border-black py-1 px-3">
							Thay đổi ảnh
						</label>
						<input id="avatarInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
					</div>
				</div>

				{/* Editable Info */}
				<div className="font-bold space-y-4">
					<div className="flex justify-between space-x-15">
						<div className="flex-1">
							Họ và tên
							<input
								type="text"
								className="mt-2 w-full border border-gray-300 rounded p-2 font-normal"
								value={infoFormData.profile.name}
								onChange={(e) => handleNestedChange('profile', 'name', e.target.value)}
							/>
						</div>
						<div className="flex-1">
							Email
							<input
								type="text"
								className="mt-2 w-full border border-gray-300 rounded p-2 font-normal"
								value={infoFormData.profile.email}
								onChange={(e) => handleNestedChange('profile', 'email', e.target.value)}
							/>
						</div>
					</div>

					<div className="flex justify-between space-x-15">
						<div className="flex-1">
							Số điện thoại
							<input
								type="text"
								className="mt-2 w-full border border-gray-300 rounded p-2 font-normal"
								value={infoFormData.profile.phone}
								onChange={(e) => handleNestedChange('profile', 'phone', e.target.value)}
							/>
						</div>
						<div className="flex-1">
							Địa chỉ
							<input
								type="text"
								className="mt-2 w-full border border-gray-300 rounded p-2 font-normal"
								value={infoFormData.profile.address}
								onChange={(e) => handleNestedChange('profile', 'address', e.target.value)}
							/>
						</div>
					</div>
				</div>

				{/* Edit Buttons */}
				<div className="flex justify-end mt-6">
					{!isEditing ? (
						<button
							className="flex items-center border border-black px-4 py-2 text-white bg-black rounded"
							onClick={() => setIsEditing(true)}
						>
							<img src="change.png" alt="Edit" className="w-5 mr-2" />
							Chỉnh sửa
						</button>
					) : (
						<div className="flex space-x-3">
							<button
								className="border border-black px-4 py-2 bg-white text-black rounded"
								onClick={() => setIsEditing(false)}
							>
								Hủy
							</button>
							<button
								className="bg-black text-white px-4 py-2 rounded"
								onClick={() => {
									setIsEditing(false)
									console.log(infoFormData)
									handleSave(infoFormData)
								}}
							>
								Lưu thay đổi
							</button>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}

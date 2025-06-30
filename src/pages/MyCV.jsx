import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cvList = Array(6).fill({
	name: 'Adolf Hitler',
	title: 'Kỹ sư phần mềm',
	date: '2024-01-15',
	phone: '0123 456 789',
	email: 'example@gmail.com',
	address: 'Hai Bà Trưng, Hà Nội, Việt Nam',
	thumbnail: '/avatar.png',
	type: 'CV Kỹ sư phần mềm',
	update: '2024-01-15',
})

export default function MyCVPage() {
	const navigate = useNavigate()
	const [checkCreateCV, setCheckCreateCV] = useState(false)
	useEffect(() => {
		if (checkCreateCV) {
			navigate('/cvinfo')
		}
	}, [checkCreateCV, navigate])

	return (
		<div className="font-sans text-black bg-white">
			{/* Filter Bar */}
			<div className="flex gap-4 px-35 py-4 bg-gray-100">
				<button
					onClick={() => navigate('/recentcv')}
					className="flex items-center px-3 py-3 bg-white rounded-md font-medium"
				>
					<img src="/clock.png" alt="Newest" className="w-6 mr-2" />
					Mới nhất
				</button>
				<button className="flex items-center px-3 py-3 bg-blue-100 rounded-md font-medium">
					<img src="/cv_icon.png" alt="My CV" className="w-6 mr-2" />
					CV Của tôi
				</button>
				<button
					onClick={() => navigate('/myprofile')}
					className="flex items-center px-3 py-3 bg-white rounded-md font-medium"
				>
					<img src="/block.png" alt="Hồ sơ" className="w-6 mr-2" />
					Hồ sơ
				</button>
			</div>

			{/* CV Section */}
			<section className="mx-20 my-8 p-6 mx-35 bg-white border border-black rounded-lg">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h3 className="text-xl font-semibold">Danh sách CV của bạn</h3>
						<p className="text-gray-600 text-sm mt-1">Quản lý và chỉnh sửa các CV đã tạo.</p>
					</div>
					<button
						className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded"
						onClick={() => setCheckCreateCV(true)}
					>
						<img src="/plus.png" alt="Add CV" className="w-6 mr-2" />
						Tạo CV mới
					</button>
				</div>

				{/* CV List */}
				<div className="flex flex-wrap gap-6 justify-between">
					{cvList.map((cv, index) => (
						<div key={index} className="bg-gray-200 w-[30%] h-[750px] rounded-lg shadow border border-gray-300 mb-15">
							<div className="flex border-b border-gray-300 p-5 bg-white">
								<div className="flex flex-col items-center w-60 pr-5">
									<img src={cv.thumbnail} alt="Avatar" className="w-24 h-24 rounded-full mb-2" />
									<div className="font-bold">{cv.name}</div>
								</div>
								<div>
									<h2 className="text-lg font-semibold">{cv.title}</h2>
									<p className="text-sm text-gray-700 mt-2">
										Tôi là một kỹ sư phần mềm với 3 năm kinh nghiệm trong phát triển ứng dụng web.
									</p>
									<div className="text-xs text-gray-500 mt-2">
										<span>{cv.phone}</span> • <span>{cv.email}</span>
										<br />
										<span>{cv.address}</span>
									</div>
								</div>
							</div>

							<div className="flex gap-10 p-6">
								<div className="flex-1">
									<h3 className="text-sm border-b border-gray-500 font-semibold mb-2">Kinh nghiệm</h3>
									<div className="text-xs text-gray-800 mb-3">
										<strong>Lập trình viên</strong>
										<br />
										ABC Corp (2021-2023)
										<ul className="list-disc ml-4">
											<li>Phát triển React/Vite</li>
											<li>Devops CI/CD</li>
										</ul>
									</div>
									<div className="text-xs text-gray-800 mb-3">
										<strong>Thiết kế mạng</strong>
										<br />
										ABC Corp (2021-2023)
										<ul className="list-disc ml-4">
											<li>Phát triển React/Vite</li>
											<li>Devops CI/CD</li>
										</ul>
									</div>

									<h3 className="text-sm border-b border-gray-500 font-semibold mb-2">Kỹ năng</h3>
									<ul className="list-disc ml-4 text-xs text-gray-800">
										<li>JavaScript, TypeScript</li>
										<li>React, Node.js</li>
										<li>Teamwork, Communication</li>
									</ul>
								</div>

								<div className="flex-1">
									<h3 className="text-sm border-b border-gray-500 font-semibold mb-2">Học vấn</h3>
									<p className="text-xs text-gray-800 mb-4">
										2020 - Cử nhân CNTT
										<br />
										Đại học Bách Khoa
										<br />
										Loại Giỏi
									</p>

									<h3 className="text-sm border-b border-gray-500 font-semibold mb-2">Chứng chỉ</h3>
									<p className="text-xs text-gray-800 mb-4">IELTS 7.0, AWS Certified</p>

									<h3 className="text-sm border-b border-gray-500 font-semibold mb-2">Người tham chiếu</h3>
									<p className="text-xs text-gray-800">
										Nguyễn B — Tech Lead
										<br />
										techlead@abc.com
									</p>
								</div>
							</div>

							<div className="flex justify-between items-center mt-71 px-4">
								<div>
									<div className="font-semibold">{cv.type}</div>
									<div className="text-sm text-gray-600">Cập nhật: {cv.date}</div>
								</div>
								<img src="/etc.png" alt="More" className="w-6" />
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

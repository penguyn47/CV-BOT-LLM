import { Link } from 'react-router-dom'

const features = [
	{
		title: 'AI thông minh',
		description: 'AI phân tích job description và tự động tối ưu nội dung CV phù hợp với vị trí ứng tuyển.',
		icon: '/ai_icon.png',
	},
	{
		title: 'ATS Scoring',
		description: 'Kiểm tra và tối ưu CV để vượt qua hệ thống ATS của các công ty, tăng cơ hội được mời phỏng vấn.',
		icon: '/at_icon.png',
	},
	{
		title: '50+ Mẫu CV đẹp',
		description: 'Thư viện mẫu CV đa dạng, thiết kế bởi chuyên gia HR phù hợp với mọi ngành nghề.',
		icon: '/cv_template.png',
	},
	{
		title: 'Xuất PDF chất lượng cao',
		description: 'Tải CV dưới định dạng PDF với chất lượng chuyên nghiệp, sẵn sàng gửi cho nhà tuyển dụng.',
		icon: '/pdf.png',
	},
	{
		title: 'Hỗ trợ 24/7',
		description: 'Đội ngũ chuyên gia HR hỗ trợ bạn tạo CV hoàn hảo và tư vấn chiến lược tìm việc.',
		icon: '/247.png',
	},
	{
		title: 'Đánh giá thực tế',
		description: 'Nhận feedback chi tiết về CV để cải thiện cơ hội thành công.',
		icon: '/feedback.png',
	},
]

export default function Home() {
	return (
		<div className="font-sans text-gray-900">
			{/* HERO */}
			<section className="flex justify-between items-start bg-gray-100 p-12">
				<div className="max-w-3/7 pl-16">
					<h1 className="text-4xl font-bold mb-2">
						Tạo CV chuyên nghiệp trong <span className="text-blue-600">vài phút</span>
					</h1>
					<p className="text-blue-600 font-semibold text-[1.4rem] mt-5 mb-2">
						Sáng tạo CV với AI – nhanh chóng, đơn giản, chuyên nghiệp
					</p>
					<p className="text-base text-[1.1rem]">
						Sử dụng AI thông minh để tạo CV ấn tượng, vượt qua ATS và thu hút nhà tuyển dụng. Hơn 50+ mẫu CV đẹp, xuất
						PDF chất lượng cao.
					</p>
					<div className="mt-6 flex gap-4">
						<button className="bg-blue-600 text-white px-7 py-2.5 rounded-md">Bắt đầu viết CV</button>
						<button className="border border-black px-6 py-2.5 rounded-md">Cập nhật CV</button>
					</div>
					<div className="mt-4 flex items-center">
						<img src="/tick.png" alt="tick" className="w-4 mr-2" />
						<small>Miễn phí thử nghiệm</small>
					</div>
				</div>
				<img src="/teamwork.png" alt="Team working" className="w-[850px] -mt-12 -mb-12" />
			</section>

			{/* WHY SECTION */}
			<section className="bg-gray-200 py-12 text-center px-4">
				<h2 className="text-[2rem] font-bold mb-2">Tại sao chọn CVPro?</h2>
				<p className="text-base text-[1.1rem] mb-6">
					Chúng tôi kết hợp công nghệ AI tiên tiến với thiết kế chuyên nghiệp để tạo ra CV hoàn hảo cho bạn.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{features.map((f, i) => (
						<div key={i} className="bg-white p-6 rounded-lg text-left shadow  pb-17">
							<img src={f.icon} alt={f.title} className="w-12 h-12 mb-4" />
							<h3 className="font-bold text-[1.25rem] mb-2">{f.title}</h3>
							<p className="text-[0.95rem] text-gray-700">{f.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA BOTTOM */}
			<section className="bg-blue-600 text-white text-center py-12 px-4">
				<h2 className="text-2xl font-bold mb-2">Sẵn sàng tạo CV ấn tượng?</h2>
				<p>Hàng nghìn ứng viên đã thành công với CVPro. Bắt đầu hành trình sự nghiệp mới của bạn ngay hôm nay!</p>
				<button className="mt-6 bg-white text-blue-600 font-bold px-6 py-3 rounded border-2 border-white">
					+ Tạo CV mới
				</button>
			</section>
		</div>
	)
}

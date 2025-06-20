import avatar from '../../public/avatar.png'

export default function CVTemplate5({ data }) {
	return (
		<div className="relative max-w-4xl mx-auto bg-white shadow-lg overflow-hidden font-sans flex my-10">
			<svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
				<polygon points="0,0 40,0 0,60" fill="#F3F4F6" />
				<polygon points="0,35 0,100 100,100" fill="#FED7AA" />
				<polygon points="70,0 100,0 100,100 50,0" fill="white" />
			</svg>
			<div className="bg-white w-full max-w-5xl p-6 rounded-xl shadow-md grid grid-cols-12 gap-6">
				{/* Sidebar - Left */}
				<div className="z-999 col-span-4 flex flex-col items-center text-center mt-10">
					<img src={avatar} alt="avatar" className="w-45 h-45 rounded-full mb-4 object-cover z-10" />

					{/* Contact Info */}
					<div className="text-sm text-[.92rem] bg-white text-left space-y-[14px] w-full border border-orange-200 p-3 px-4 rounded shadow-sm -mt-8">
						<p className="mt-3.5">👤 Male</p>
						<p>📅 May 19, 1995</p>
						<p>✉️ Steven@3223com</p>
						<p>📞 986-2323-3434</p>
						<p>🔗 http://steven-info.me</p>
						<p>📍 London, England</p>
					</div>

					{/* Objective */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4 mt-1 text-left">MỤC TIÊU</h2>
						<p className="text-sm text-[.92rem] text-left pl-3 mb-3">
							Take advantages of sales skills & experience and understanding of market to become a professional Sales
							Staff and bring a lot value to Customers. From that, I will contribute to development of TOPCV Company.
						</p>
					</div>

					{/* Skills */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6 w-[100%] pb-6">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 mb-4 mt-1 pl-3 text-left">KĨ NĂNG</h2>
						<div className="ml-2 text-left text-sm">
							<p className=" font-semibold">Computer</p>
							<p>- Word, Excel, PowerPoint</p>
							<p className="font-semibold mt-1.5">Language</p>
							<p>- English, Japanese, Chinese</p>
						</div>
					</div>

					{/* Interests */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm mt-6 w-[100%] pb-6 text-left">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 mb-4 mt-1 pl-3">SỞ THÍCH</h2>
						<p className="text-sm pl-2">I like soccer, music..</p>
					</div>
				</div>

				{/* Main Content - Right */}
				<div className="z-999 col-span-8 space-y-6 mt-15">
					{/* Name and Job */}
					<div className="flex flex-col justify-center items-center">
						<h1 className="text-[2.7rem] font-600">STEVEN TERRY</h1>
						<div className="w-85 h-[2px] bg-orange-400 rounded-full mt-1 mb-1"></div>
						<p className="text-gray-500 mb-4 text-[1.2rem]">Sales Staff</p>
					</div>

					{/* Education */}
					<div className="bg-white border border-orange-200 p-3 rounded shadow-sm">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4">TRÌNH ĐỘ HỌC VẤN</h2>
						<div className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4">
							<p className="font-semibold">🎓 TOPCV University, Corporate Administration</p>
							<p className="text-black/65">Oct 2012 - May 2016</p>
							<p>GPA: 3.6/4</p>
						</div>
						<div className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4">
							<p className="font-semibold">🎓 TOPCV University, Corporate Administration</p>
							<p className="text-black/65">Oct 2012 - May 2016</p>
							<p>GPA: 3.6/4</p>
						</div>
					</div>

					{/* Work Experience */}
					<div className="bg-white border border-orange-200 p-4 rounded shadow-sm">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4">KINH NGHIỆM VIỆC LÀM</h2>
						<div className="text-sm space-y-4">
							<div className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4">
								<p className="font-semibold">🏢 TOPCV JSC, Sales Staff</p>
								<p className="text-black/65">May 2016 - Present</p>
								<ul className="list-disc ml-5">
									<li>Write and upload product advertising post via Facebook, Forum…</li>
									<li>Introduce, consult products and answer customers' queries via phone and email.</li>
									<li>Assist to control goods in and out</li>
								</ul>
							</div>
							<div className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4">
								<p className="font-semibold">🏬 TOPCV Shop, Part-time Sales Staff</p>
								<p className="text-black/65">Nov 2013 - Jun 2014</p>
								<ul className="list-disc ml-5">
									<li>Sell goods for Foreigners and Vietnamese at the Shop</li>
									<li>Advertise products on media publications</li>
									<li>Make reports of sales every day.</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Activities */}
					<div className="bg-white border border-orange-200 p-4 rounded shadow-sm">
						<h2 className="text-[1.05rem] font-bold bg-orange-200 p-1.5 px-4 mb-4">HOẠT ĐỘNG NGOẠI KHÓA</h2>
						<div className="text-sm text-[.92rem] px-3 space-y-1.4 mb-4">
							<p className="font-semibold">🧍 TOPCV - EDUCATION TALK 2014, Member</p>
							<p className="text-black/65">Jun 2014 - Feb 2015</p>
							<ul className="list-disc ml-5">
								<li>Organize monthly events, network with US alumni</li>
								<li>
									Share how to hunt scholarships and US student's life experiences to students who received offers from
									US universities
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

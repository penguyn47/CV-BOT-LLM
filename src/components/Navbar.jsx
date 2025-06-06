import { NavLink } from 'react-router-dom'

function Navbar() {
	return (
		<>
			<div className="flex justify-between py-4 px-8 border-b-3 border-gray-300">
				{/* PAGE ICON SECTION */}
				<div className="flex justify-between gap-2 items-center">
					<img src="/icon.png" className="h-[30px]" />
					<div className="font-bold text-xl">CV Pro</div>
				</div>

				{/* NAV ITEMS SECTION */}
				<div>
					<ul className="flex justify-between gap-6 text-xl">
						<li>
							<NavLink className="hover:text-gray-400" to="/" end>
								Trang chủ
							</NavLink>
						</li>
						<li>
							<NavLink className="hover:text-gray-400" to="/cvtemplate" end>
								Mẫu CV
							</NavLink>
						</li>
						<li>
							<div>Hồ sơ của tôi</div>
						</li>
						<li>
							<div>Hướng dẫn</div>
						</li>
					</ul>
				</div>

				{/* USER SECTION */}
				<div>
					<img src="/icon.png" className="h-[30px]" />
				</div>
			</div>
		</>
	)
}

export default Navbar

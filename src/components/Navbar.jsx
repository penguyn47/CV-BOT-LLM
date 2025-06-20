import { useNavigate } from 'react-router-dom'

function Navbar() {
	const navigate = useNavigate()
	return (
		<>
			<div className=" flex justify-between items-center py-4 pl-17 pr-7 border-b">
				<div onClick={() => navigate('/')} className=" cursor-pointer  flex items-center font-bold text-xl">
					<img src="icon.png" alt="Logo" className="w-10 mr-1" />
					CVPro
				</div>
				<nav className="flex gap-6">
					<a className="cursor-pointer text-gray-600">Trang chủ</a>
					<a className="cursor-pointer text-gray-600">Mẫu CV</a>
					<a onClick={() => navigate('/recentcv')} className="cursor-pointer text-gray-600">
						Hồ sơ của tôi
					</a>
					<a className="cursor-pointer text-gray-600">Hướng dẫn</a>
				</nav>
				<div className="flex gap-4">
					<button className="border border-black px-4 py-2 rounded">Đăng nhập</button>
					<button className="bg-black text-white px-7 py-2 rounded">Đăng ký</button>
				</div>
			</div>
		</>
	)
}

export default Navbar

function CVTemplate() {
  return (
		<>
			{/* HEADER SECTION */}
			<div className="flex flex-col items-center p-4" id="content-header">
				<div className="text-xl font-bold">Chọn mẫu CV phù hợp</div>
				<div className="w-[400px] text-center">
					Chọn ngay mẫu CV tuyệt đẹp và ấn tượng bên dưới để dễ dàng thu hút nhà tuyển dụng!
				</div>
			</div>

			{/* BODY SECTION */}
			<div className="bg-amber-300 h-[800px]"></div>

			{/* FOOTER SECTION */}
			<div className="flex justify-around px-16 py-8 border-y-3 border-gray-300">
				<div className="flex flex-col gap-4 w-[250px]">
					<div className="text-xl font-bold">Tạo những CV tuyệt vời cho công việc tiếp theo của bạn</div>
					<div className="">
						Chỉ trong 3 bước, tạo ấn tượng ngay với nhà tuyển dụng và công ty với CV chuyên nghiệp và tuyệt vời của bạn
					</div>
					<a href="#content-header" className="bg-blue-500 w-fit text-white py-3 px-2 rounded-sm text-[1rem]">
						Tạo CV ngay
					</a>
				</div>
				<img src="/employee.png" alt="" className="h-[300px]" />
				<div className="flex flex-col gap-4 w-1/4">
					<div className="flex gap-2">
						<div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-blue-300 rounded-sm px-4">
							1
						</div>
						<div>
							<div className="text-xl font-bold">Bắt đầu tạo CV từ những mẫu CV có sẵn</div>
							<div>Chọn mẫu CV phù hợp và tùy chỉnh bố cục, sau đó điền tất cả nội dung cần thiết. Thế là xong!</div>
						</div>
					</div>
					<div className="flex gap-2">
						<div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-blue-300 rounded-sm px-4">
							2
						</div>
						<div>
							<div className="text-xl font-bold">Nộp đơn thôi!</div>
							<div>
								Bây giờ, CV của bạn đã sẵn sàng rồi! Hãy lưu và tải về để bắt đầu theo đuổi công việc mơ ước nào.
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CVTemplate;

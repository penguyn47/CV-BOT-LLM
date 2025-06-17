function CVTemplate() {
  const templates = [
    { id: 1, img: "/template1.png", link: "/cvtemplate1", alt: "CV Template 1" },
    { id: 2, img: "/template2.png", link: "/cvtemplate2", alt: "CV Template 2" },
    { id: 3, img: "/template3.png", link: "/template1", alt: "CV Template 3" },
    { id: 4, img: "/template4.png", link: "/template2", alt: "CV Template 4" },
  ];

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
      <div className="bg-white min-h-[800px] py-10 px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Mẫu CV nổi bật</h2>
          <p className="text-gray-600">Chọn mẫu CV phù hợp để bắt đầu chỉnh sửa và sử dụng ngay</p>
        </div>

        {/* Grid hiển thị các template */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {templates.map((tpl) => (
            <div key={tpl.id} className="relative group cursor-pointer transition-transform hover:scale-105">
              <a href={tpl.link}>
                <img
                  src={tpl.img}
                  alt={tpl.alt}
                  className="w-[250px] h-[350px] object-contain bg-white shadow-md rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                  <span className="text-white text-lg font-semibold">Xem trước</span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="flex justify-around px-16 py-8 border-y-3 border-gray-300 flex-wrap gap-10">
        <div className="flex flex-col gap-4 w-[250px]">
          <div className="text-xl font-bold">Tạo những CV tuyệt vời cho công việc tiếp theo của bạn</div>
          <div>
            Chỉ trong 3 bước, tạo ấn tượng ngay với nhà tuyển dụng và công ty với CV chuyên nghiệp và tuyệt vời của bạn
          </div>
          <a
            href="#content-header"
            className="bg-blue-500 w-fit text-white py-3 px-4 rounded-sm text-[1rem]"
          >
            Tạo CV ngay
          </a>
        </div>

        <img src="/employee.png" alt="" className="h-[300px]" />

        <div className="flex flex-col gap-4 w-1/4 min-w-[250px]">
          <div className="flex gap-2">
            <div className="w-10 h-10 flex items-center justify-center text-xl font-bold bg-blue-300 rounded-sm px-4">
              1
            </div>
            <div>
              <div className="text-xl font-bold">Bắt đầu tạo CV từ những mẫu CV có sẵn</div>
              <div>
                Chọn mẫu CV phù hợp và tùy chỉnh bố cục, sau đó điền tất cả nội dung cần thiết. Thế là xong!
              </div>
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
  );
}

export default CVTemplate;

import React, { useState } from "react";

export default function CVTemplate() {
    const [currentPage, setCurrentPage] = useState(1);

    const togglePage = () => {
        setCurrentPage(currentPage === 1 ? 2 : 1);
    };

    // Biểu tượng SVG dưới dạng thành phần nội tuyến để thay thế các import từ Lucide React
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

    return (
        <>
            {/* Nhập font Poppins từ Google Fonts */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
            <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white shadow-lg print:shadow-none">
                    {currentPage === 1 ? (
                        <div className="flex flex-col md:flex-row w-full">
                            {/* Cột trái - Trang 1 */}
                            <div className="w-full md:w-1/3 bg-slate-400 p-6 text-slate-800">
                                <div className="mb-8">
                                    <h1 className="text-4xl font-bold uppercase">Jackie</h1>
                                    <h1 className="text-4xl font-bold uppercase">Duran</h1>
                                    <div className="border-t-2 border-slate-600 w-12 mt-2"></div>
                                </div>

                                <div className="space-y-2 mb-8">
                                    <div className="flex items-center gap-2">
                                        <Mail />
                                        <span>example@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone />
                                        <span>555-555-5555</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin />
                                        <span>Phoenix, Arizona 85018</span>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Học vấn</h2>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Đại học Bang Arizona</h3>
                                        <p>Tempe, AZ</p>
                                        <p className="italic">Thạc sĩ Khoa học: Kỹ thuật Công nghiệp</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Đại học Bang Arizona</h3>
                                        <p>Tempe, AZ</p>
                                        <p className="italic">Cử nhân Khoa học: Kỹ thuật Sản xuất</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Chứng chỉ</h2>
                                    <ul className="list-disc pl-5">
                                        <li>Chứng chỉ Kỹ sư Chuyên nghiệp (PE) - (2023)</li>
                                        <li>GeoSpatial và BIM</li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Kinh nghiệm giảng dạy</h2>
                                    <div>
                                        <h3 className="font-semibold">Trợ giảng Sau đại học, Kỹ thuật Công nghiệp</h3>
                                        <p>Đại học Bang Arizona, Tempe, AZ, 2020-2021</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Kinh nghiệm nghiên cứu</h2>
                                    <div>
                                        <h3 className="font-semibold">"Tối ưu hóa quy trình CAD cho ứng dụng công nghiệp"</h3>
                                        <p>Nghiên cứu hợp tác với Khoa Kỹ thuật, Đại học Bang Arizona, 2021</p>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold uppercase mb-2">Kinh nghiệm làm việc</h2>
                                    <div className="mb-4">
                                        <h3 className="font-semibold">Quest Global - Kỹ sư Thiết kế</h3>
                                        <p>Phoenix, AZ - 12/2021 - Hiện tại</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">ASM International - Trợ lý Kỹ sư Sản xuất</h3>
                                        <p>Phoenix, AZ - 06/2021 - 11/2021</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải - Trang 1 */}
                            <div className="w-full md:w-2/3 bg-gray-50 p-6">
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Tóm tắt cá nhân</h2>
                                    <p>
                                        Kỹ sư thiết kế có kinh nghiệm trong mô phỏng CAD và phát triển sản phẩm. Người làm việc nhóm hiệu quả với thành tích đã được chứng minh trong việc thực hiện nhiều dự án đồng thời trong môi trường nhịp độ nhanh. Tăng cường hiệu quả sản xuất thông qua phân tích định tính và tái thiết kế quy trình.
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Kỹ năng cốt lõi</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                                        <ul className="list-disc pl-5">
                                            <li>Kiểm soát chất lượng</li>
                                            <li>Mô phỏng 3D</li>
                                            <li>Tạo mẫu nhanh</li>
                                            <li>Kỹ thuật quy trình</li>
                                        </ul>
                                        <ul className="list-disc pl-5">
                                            <li>Tư duy sáng tạo</li>
                                            <li>Đọc và diễn giải bản vẽ kỹ thuật</li>
                                            <li>Phân tích ứng suất</li>
                                            <li>Quản lý kiểm soát chất lượng</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold uppercase mb-2">Tóm tắt năng lực</h2>
                                    <ul className="list-disc pl-5">
                                        <li>
                                            Khả năng giải quyết các thách thức thiết kế thành công và đánh giá các mô hình thiết kế thay thế để đáp ứng yêu cầu dự án.
                                        </li>
                                        <li>Thành thạo trong việc hợp tác với các nhóm đa chức năng để hình thành và tinh chỉnh khái niệm sản phẩm.</li>
                                        <li>Nguồn lực dồi dào và tổ chức tốt với kỹ năng lãnh đạo và xây dựng đội nhóm xuất sắc.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold uppercase mb-2">Kỹ năng chuyên môn</h2>

                                    <div className="mb-4">
                                        <h3 className="font-semibold">Thiết kế</h3>
                                        <ul className="list-disc pl-5">
                                            <li>
                                                Chuyển đổi các khái niệm thành luồng người dùng, wireframe, mockup và nguyên mẫu để thúc đẩy tương tác tích cực, sơ đồ trang web, tương tác và trải nghiệm người dùng.
                                            </li>
                                            <li>
                                                Tham gia vào thiết kế và kỹ thuật sản xuất để giảm 20% thời gian đưa năm sản phẩm ra thị trường.
                                            </li>
                                            <li>
                                                Tham gia phân tích trước dự án và đánh giá kỹ thuật để phát triển chức năng phù hợp nhằm đáp ứng mục tiêu kinh doanh.
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="font-semibold">Quản lý dự án</h3>
                                        <ul className="list-disc pl-5">
                                            <li>
                                                Xác định và thực hiện các quy trình thiết kế ở tất cả các giai đoạn, bao gồm nghiên cứu, hình thành ý tưởng, thử nghiệm và triển khai cho năm dự án.
                                            </li>
                                            <li>
                                                Xác định ưu tiên công việc cho nhiều dự án và truyền đạt trình tự, ưu tiên và thời gian cho đội gồm 15 người.
                                            </li>
                                            <li>Chỉ đạo tài liệu chi tiết về yêu cầu thiết kế và thông số kỹ thuật.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold">Quy trình sản xuất</h3>
                                        <ul className="list-disc pl-5">
                                            <li>Làm việc chặt chẽ với ba kỹ sư và hỗ trợ họ trong việc thử nghiệm sản phẩm.</li>
                                            <li>Hỗ trợ thiết kế tài liệu và đề xuất.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row w-full">
                            {/* Cột trái - Trang 2 */}
                            <div className="w-full md:w-1/3 bg-slate-400 p-6 print:p-4">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-lg">CyberCoders · Thực tập sinh Thiết kế</h2>
                                        <p className="text-slate-600">Phoenix, AZ · 09/2017 - 06/2018</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cột phải - Trang 2 */}
                            <div className="w-full md:w-2/3 p-6 print:p-4">
                                <div className="space-y-6">
                                    {/* Chi tiết kinh nghiệm làm việc */}
                                    <div>
                                        <ul className="list-disc ml-5 space-y-2 text-slate-700">
                                            <li>
                                                Hợp tác với các nhóm kỹ thuật về tuyên bố thiết kế, thời gian thực hiện, chi phí kỹ thuật, ngân sách và tuyên bố công việc để quản lý nỗ lực phát triển nhà cung cấp.
                                            </li>
                                            <li>Xem xét sản phẩm để tuân thủ yêu cầu Thiết kế cho Sản xuất (DFM).</li>
                                        </ul>
                                    </div>

                                    {/* Xuất bản */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Xuất bản</h2>
                                        <p className="text-slate-700">
                                            Duran, Jackie. "Cách tiếp cận sáng tạo để tối ưu hóa quy trình từ thiết kế đến sản xuất."{" "}
                                            <span className="italic">Tạp chí Kỹ thuật Sản xuất</span>, tập 28, số 3, 2022, trang 87-99.
                                        </p>
                                    </div>

                                    {/* Bài trình bày hội nghị */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Bài trình bày hội nghị
                                        </h2>
                                        <p className="text-slate-700">
                                            "Tiến bộ trong kỹ thuật tạo mẫu nhanh," trình bày tại Hội nghị Quốc tế về Đổi mới Sản xuất 2022, San Diego, CA.
                                        </p>
                                    </div>

                                    {/* Tham dự hội nghị */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Tham dự hội nghị
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Hội nghị Quốc tế về Đổi mới Sản xuất, 2022</li>
                                            <li>Triển lãm CAD và Tạo mẫu, 2021</li>
                                        </ul>
                                    </div>

                                    {/* Tài trợ hoặc quỹ nghiên cứu */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Tài trợ hoặc quỹ nghiên cứu
                                        </h2>
                                        <p className="text-slate-700">
                                            Nhận tài trợ 15.000 USD cho nghiên cứu về phân tích ứng suất trong tạo mẫu nhanh, Đại học Bang Arizona, 2021
                                        </p>
                                    </div>

                                    {/* Danh hiệu và giải thưởng */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Danh hiệu và giải thưởng
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Kỹ sư của Năm, Quest Global, 2023</li>
                                            <li>Xuất sắc trong Quy trình Sản xuất, ASM International, 2020</li>
                                        </ul>
                                    </div>

                                    {/* Liên kết chuyên môn */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Liên kết và thành viên chuyên môn
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Thành viên, Hiệp hội Kỹ sư Cơ khí Hoa Kỳ (ASME)</li>
                                            <li>Thành viên, Hiệp hội Kỹ sư Sản xuất (SME)</li>
                                        </ul>
                                    </div>

                                    {/* <!-- Training --> */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">Đào tạo</h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Hội thảo Mô phỏng CAD Nâng cao, Quest Global, 2022</li>
                                            <li>Chương trình Lãnh đạo trong Kỹ thuật, ASM International, 2021</li>
                                        </ul>
                                    </div>

                                    {/* <!-- Community Outreach --> */}
                                    <div>
                                        <h2 className="text-slate-800 font-semibold text-base uppercase tracking-wider mb-3">
                                            Hoạt động cộng đồng
                                        </h2>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-700">
                                            <li>Tình nguyện viên hướng dẫn cho các kỹ sư trẻ, Chương trình STEM Arizona, 2019-Hiện tại</li>
                                            <li>Tổ chức các hội thảo cho học sinh trung học về mô phỏng CAD và tạo mẫu</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <!-- Toggle Button --> */}
                    <div className="flex justify-center py-4">
                        <button
                            onClick={togglePage}
                            className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
                        >
                            {currentPage === 1 ? "Đi đến Trang 2" : "Đi đến Trang 1"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
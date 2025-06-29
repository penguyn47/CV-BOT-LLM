import React, { useState } from "react";

export default function CVTemplate1() {
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
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg">
                {currentPage === 1 ? (
                    <div className="flex flex-col md:flex-row">
                        {/* Cột trái - Trang 1 */}
                        <div className="md:w-2/3 p-8">
                            <h1 className="text-3xl font-bold text-[#2c5777] mb-4">JAMES STELE</h1>
                            <div className="border-t border-gray-300 mb-6"></div>

                            {/* Tóm tắt cá nhân */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">TÓM TẮT CÁ NHÂN</h2>
                                <div className="border-t border-gray-300 mb-3"></div>
                                <p className="text-sm leading-relaxed">
                                    Kỹ sư ứng dụng có nền tảng kỹ thuật vững chắc, hiệu quả trong việc phân tích thông tin liên quan và quản lý chu kỳ sản phẩm từ ý tưởng đến hoàn thiện. Quản lý nỗ lực thiết kế và hướng dẫn quy trình cài đặt để ra mắt sản phẩm đúng tiến độ. Tư vấn với khách hàng nội bộ và bên ngoài, đồng thời sử dụng các nguồn lực hệ thống bổ sung để xem xét và cải thiện cấu hình nhằm tối ưu hóa sự hài lòng của khách hàng.
                                </p>
                            </div>

                            {/* Kinh nghiệm làm việc */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">KINH NGHIỆM LÀM VIỆC</h2>
                                <div className="border-t border-gray-300 mb-3"></div>

                                <div className="mb-4">
                                    <div className="font-semibold">Kỹ sư Ứng dụng, 08/2020 - Hiện tại</div>
                                    <div className="text-sm mb-2">Deluxe, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Trình bày các giải pháp thiết kế đề xuất bằng cách chuẩn bị và trình bày các bố cục CAD cho các khái niệm hệ thống.
                                        </li>
                                        <li>
                                            Làm việc với đội Dự án Đặc biệt và hai nhà cung cấp bên ngoài để chuẩn bị thông số kỹ thuật thiết kế theo mục tiêu dự án.
                                        </li>
                                        <li>
                                            Tạo ước tính chi phí RFQ, bao gồm thiết bị ngoại vi, vật liệu FL, lao động lắp ráp và hơn thế nữa.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Kỹ sư Ứng dụng, 03/2020 - 08/2020</div>
                                    <div className="text-sm mb-2">Tech USA, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Phân tích, thiết kế, phát triển và thử nghiệm các hệ thống robot theo bản vẽ CAD, hướng dẫn bằng văn bản và các thông số kỹ thuật khác.
                                        </li>
                                        <li>
                                            Tạo đề xuất bằng văn bản nêu rõ phạm vi công việc chính xác và các giải pháp kỹ thuật được đề xuất, các sản phẩm cụ thể và mô tả vận hành.
                                        </li>
                                        <li>
                                            Tư vấn và sau đó giám sát một đội kỹ thuật lớn hơn gồm 25 thành viên để đảm bảo đáp ứng các tiêu chí thiết kế đã chỉ định.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Kỹ sư Ứng dụng Hiện trường, 06/2012 - 05/2020</div>
                                    <div className="text-sm mb-2">Aerotek, Atlanta, GA</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Chế tạo, lắp ráp và thử nghiệm các thành phần cơ khí dành riêng cho sử dụng trong môi trường ngoài trời; trình bày thông số CAD đã chỉnh sửa cho các kỹ sư cơ khí.
                                        </li>
                                        <li>
                                            Trả lời các câu hỏi của khách hàng qua điện thoại và email; thực hiện các cuộc gọi dịch vụ trực tiếp để hỗ trợ thêm.
                                        </li>
                                        <li>
                                            Có mặt tại hiện trường để giao sản phẩm cuối cùng, hỗ trợ mở hộp, thiết lập và xử lý sự cố ban đầu.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Kinh nghiệm nghiên cứu */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">KINH NGHIỆM NGHIÊN CỨU</h2>
                                <div className="border-t border-gray-300 mb-3"></div>

                                <div className="mb-4">
                                    <div className="font-semibold">Trợ lý Nghiên cứu – Tối ưu hóa Hiệu suất Ứng dụng</div>
                                    <div className="text-sm mb-2">Đại học California, Berkeley (2020-2021)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Phát triển các thuật toán để cải thiện thời gian phản hồi ứng dụng lên 20%.</li>
                                        <li>
                                            Công bố kết quả nghiên cứu trên <em>Tạp chí Nghiên cứu Kỹ thuật Phần mềm</em>.
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Nhà nghiên cứu – Phát triển Ứng dụng Dựa trên Đám mây</div>
                                    <div className="text-sm mb-2">Phòng thí nghiệm Công nghệ Atlanta (2019-2020)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>
                                            Tiến hành nghiên cứu về các ứng dụng gốc đám mây có khả năng mở rộng, dẫn đến giảm 30% thời gian triển khai.
                                        </li>
                                        <li>Trình bày kết quả tại hai hội nghị công nghệ quốc tế.</li>
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold">Thực tập sinh Nghiên cứu – Hệ thống Nhúng</div>
                                    <div className="text-sm mb-2">ABC Innovations (2018-2019)</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Tối ưu hóa firmware cấp thấp, cải thiện hiệu suất hệ thống lên 15%.</li>
                                        <li>Đồng tác giả một bài báo nghiên cứu về hiệu suất ứng dụng nhúng.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Cột phải - Trang 1 */}
                        <div className="md:w-1/3 bg-[#2c5777] text-white p-8">
                            {/* Thông tin liên hệ */}
                            <div className="mb-8">
                                <div className="flex items-center mb-3">
                                    <MapPin />
                                    <span>Atlanta, GA 30301</span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <Phone />
                                    <span>(555) 555-5555</span>
                                </div>
                                <div className="flex items-center mb-3">
                                    <Mail />
                                    <span>example@example.com</span>
                                </div>
                            </div>

                            {/* Kỹ năng cốt lõi */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">KỸ NĂNG CỐT LÕI</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Phát triển giải pháp</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Công nghệ ảo hóa</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Ứng dụng phần mềm</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Cấu hình cơ sở dữ liệu</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Nền tảng phần mềm</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Mô hình giải pháp</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Quản lý cơ sở dữ liệu</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Hợp tác</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Học vấn */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">HỌC VẤN</h2>
                                <div className="mb-4">
                                    <div className="font-semibold">Thạc sĩ Khoa học Máy tính</div>
                                    <div>Đại học Bang Georgia - Atlanta, GA</div>
                                </div>
                                <div>
                                    <div className="font-semibold">Cử nhân Khoa học Máy tính</div>
                                    <div>Đại học Bang Georgia - Atlanta, GA</div>
                                </div>
                            </div>

                            {/* Chứng chỉ */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">CHỨNG CHỈ</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Kiến trúc sư Giải pháp Được Chứng nhận AWS – Cấp độ Liên kết – Amazon Web Services</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Chứng nhận Microsoft: Nhà phát triển Azure – Cấp độ Liên kết – Microsoft</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Nhà phát triển Ứng dụng Kubernetes Được Chứng nhận (CKAD) – Quỹ Điện toán Gốc Đám mây</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Lập trình viên Java Được Chứng nhận Oracle (OCJP) – Oracle</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Kỹ sư DevOps Được Chứng nhận – Red Hat</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Đào tạo */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">ĐÀO TẠO</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>C++ Nâng cao cho Phát triển Phần mềm – Coursera</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Phát triển Ứng dụng Gốc Đám mây – Nền tảng Google Cloud (GCP)</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Kiến trúc và Thiết kế Vi dịch vụ – Udemy</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>DevOps cho Kỹ sư Ứng dụng – LinkedIn Learning</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Phát triển Ứng dụng Full-Stack – edX (do MIT cung cấp)</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Liên kết */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">LIÊN KẾT</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Hiệp hội Chuyên gia Công nghệ Thông tin</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Hiệp hội Máy tính (ACM)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Viện Kỹ sư Điện và Điện tử (IEEE) – Hội Máy tính</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row">
                        {/* Cột trái - Trang 2 */}
                        <div className="md:w-2/3 p-8">
                            {/* Xuất bản */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">XUẤT BẢN</h2>
                                <div className="border-t border-gray-300 mb-3"></div>
                                <div className="mb-4">
                                    <div className="font-semibold">Stele, James. "Tối ưu hóa Hiệu suất Hệ thống Ứng dụng Nhúng"</div>
                                    <div className="text-sm mb-2"><em>Tạp chí Kỹ thuật Phần mềm</em>, tập 29, số 4, 2021, trang 45-60.</div>
                                </div>
                                <div className="mb-4">
                                    <div className="font-semibold">Stele, James. "Kiến trúc Đám mây trong Phát triển Ứng dụng Hiện đại"</div>
                                    <div className="text-sm mb-2"><em>Tạp chí Công nghệ Đám mây</em>, tập 15, số 2, 2020, trang 112-125.</div>
                                </div>
                            </div>

                            {/* Bài trình bày hội nghị */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">BÀI TRÌNH BÀY HỘI NGHỊ</h2>
                                <div className="border-t border-gray-300 mb-3"></div>
                                <div className="mb-4">
                                    <div className="font-semibold">"Tăng tốc Triển khai Ứng dụng với Công nghệ Đám mây"</div>
                                    <div className="text-sm mb-2">Hội nghị Công nghệ Quốc tế 2021, San Francisco, CA</div>
                                </div>
                                <div className="mb-4">
                                    <div className="font-semibold">"Tối ưu hóa Firmware cho Hệ thống Nhúng"</div>
                                    <div className="text-sm mb-2">Hội nghị Kỹ thuật Hệ thống Nhúng 2020, Boston, MA</div>
                                </div>
                            </div>

                            {/* Hoạt động cộng đồng */}
                            <div>
                                <h2 className="text-xl font-semibold text-[#2c5777] mb-3">HOẠT ĐỘNG CỘNG ĐỒNG</h2>
                                <div className="border-t border-gray-300 mb-3"></div>
                                <div className="mb-4">
                                    <div className="font-semibold">Tình nguyện viên Hướng dẫn, Chương trình STEM Atlanta</div>
                                    <div className="text-sm mb-2">Atlanta, GA, 2018-Hiện tại</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Hướng dẫn học sinh trung học về lập trình và thiết kế hệ thống nhúng.</li>
                                        <li>Tổ chức hội thảo về phát triển ứng dụng đám mây cho sinh viên đại học.</li>
                                    </ul>
                                </div>
                                <div className="mb-4">
                                    <div className="font-semibold">Diễn giả Khách mời, Hội thảo Công nghệ Thanh niên</div>
                                    <div className="text-sm mb-2">Atlanta, GA, 2019-2020</div>
                                    <ul className="list-disc pl-5 text-sm space-y-2">
                                        <li>Trình bày về vai trò của DevOps trong phát triển phần mềm hiện đại.</li>
                                        <li>Chia sẻ kinh nghiệm thực tế về quản lý dự án kỹ thuật với các bạn trẻ.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Cột phải - Trang 2 */}
                        <div className="md:w-1/3 bg-[#2c5777] text-white p-8">
                            {/* Giải thưởng và danh hiệu */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">GIẢI THƯỞNG VÀ DANH HIỆU</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Kỹ sư Xuất sắc của Năm, Deluxe, 2022</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Giải thưởng Đổi mới Công nghệ, Tech USA, 2020</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div>Giải Nghiên cứu Xuất sắc, Đại học California, Berkeley, 2021</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Dự án nổi bật */}
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4">DỰ ÁN NỔI BẬT</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div className="font-semibold">Hệ thống Tự động hóa Dựa trên Đám mây</div>
                                            <div>Deluxe, 2021</div>
                                            <div className="text-sm">Dẫn dắt phát triển hệ thống tự động hóa, giảm chi phí vận hành 25%.</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <div>
                                            <div className="font-semibold">Tối ưu hóa Robot Công nghiệp</div>
                                            <div>Tech USA, 2020</div>
                                            <div className="text-sm">Cải tiến hiệu suất robot công nghiệp, tăng năng suất 18%.</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Kỹ năng kỹ thuật bổ sung */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">KỸ NĂNG KỸ THUẬT BỔ SUNG</h2>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Lập trình Python và JavaScript</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Triển khai CI/CD với Jenkins và GitLab</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Quản lý container với Docker và Kubernetes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>Phân tích dữ liệu với SQL và NoSQL</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nút chuyển đổi */}
                <div className="flex justify-center py-4">
                    <button
                        onClick={togglePage}
                        className="bg-[#2c5777] text-white px-6 py-2 rounded-md hover:bg-[#1e3a5f] transition-colors"
                    >
                        {currentPage === 1 ? "Đi đến Trang 2" : "Đi đến Trang 1"}
                    </button>
                </div>
            </div>
        </div>
    );
}
import React, { useState, type KeyboardEvent } from 'react';

const CVInfoForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState<string>('');
    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter((skill) => skill !== skillToRemove));
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-12 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <div className="w-full max-w-[80%] mx-auto">
                <div className="p-10 bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="max-w-[80%] mx-auto">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <h1 className="mb-3 text-3xl font-bold text-gray-900">Thông tin chuẩn bị CV</h1>
                            <p className="text-base text-gray-600">Điền thông tin để chúng tôi tạo CV phù hợp nhất cho bạn</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3 text-base">
                                <span className="font-medium text-gray-700">Bước {currentStep}/4</span>
                                <span className="text-gray-500">{Math.round(progress)}% hoàn thành</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full">
                                <div
                                    className="h-3 transition-all duration-300 bg-blue-600 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Step Content */}
                        <div className="p-8 bg-white rounded-lg shadow-lg">
                            {/* Step 1: Personal Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <svg
                                            className="w-7 h-7 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                                    </div>
                                    <p className="mb-6 text-base text-gray-600">Cung cấp thông tin cơ bản về bản thân</p>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label htmlFor="fullName" className="block text-base font-medium text-gray-700">
                                                Họ và tên *
                                            </label>
                                            <input
                                                id="fullName"
                                                placeholder="Nguyễn Văn A"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="email" className="block text-base font-medium text-gray-700">
                                                Email *
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                placeholder="example@email.com"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="phone" className="block text-base font-medium text-gray-700">
                                                Số điện thoại *
                                            </label>
                                            <input
                                                id="phone"
                                                placeholder="0123456789"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="location" className="block text-base font-medium text-gray-700">
                                                Địa chỉ
                                            </label>
                                            <input
                                                id="location"
                                                placeholder="Thành phố Hồ Chí Minh"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="summary" className="block text-base font-medium text-gray-700">
                                                Giới thiệu bản thân (tóm tắt)
                                            </label>
                                            <textarea
                                                id="summary"
                                                placeholder="Mô tả ngắn gọn về bản thân, kinh nghiệm và mục tiêu nghề nghiệp..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Career Objectives */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <svg
                                            className="w-7 h-7 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3M6 21h12"
                                            />
                                        </svg>
                                        <h2 className="text-2xl font-semibold">Mục tiêu nghề nghiệp</h2>
                                    </div>
                                    <p className="mb-6 text-base text-gray-600">Mô tả vị trí và mục tiêu công việc</p>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label htmlFor="targetPosition" className="block text-base font-medium text-gray-700">
                                                Vị trí mong muốn *
                                            </label>
                                            <input
                                                id="targetPosition"
                                                placeholder="Frontend Developer, Marketing Manager, ..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="experienceLevel" className="block text-base font-medium text-gray-700">
                                                Cấp độ kinh nghiệm
                                            </label>
                                            <select
                                                id="experienceLevel"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Chọn cấp độ</option>
                                                <option value="fresher">Fresher (0-1 năm)</option>
                                                <option value="junior">Junior (1-3 năm)</option>
                                                <option value="middle">Middle (3-5 năm)</option>
                                                <option value="senior">Senior (5+ năm)</option>
                                                <option value="lead">Lead/Manager</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="industry" className="block text-base font-medium text-gray-700">
                                                Ngành nghề
                                            </label>
                                            <select
                                                id="industry"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Chọn ngành nghề</option>
                                                <option value="it">Công nghệ thông tin</option>
                                                <option value="marketing">Marketing</option>
                                                <option value="finance">Tài chính - Ngân hàng</option>
                                                <option value="education">Giáo dục</option>
                                                <option value="healthcare">Y tế</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="careerGoals" className="block text-base font-medium text-gray-700">
                                                Mục tiêu nghề nghiệp
                                            </label>
                                            <textarea
                                                id="careerGoals"
                                                placeholder="Mô tả mục tiêu nghề nghiệp dài hạn của bạn..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Company Information */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <svg
                                            className="w-7 h-7 text-purple-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        <h2 className="text-2xl font-semibold">Thông tin công ty mục tiêu</h2>
                                    </div>
                                    <p className="mb-6 text-base text-gray-600">Thông tin về công ty bạn muốn ứng tuyển</p>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label htmlFor="companyName" className="block text-base font-medium text-gray-700">
                                                Tên công ty mục tiêu
                                            </label>
                                            <input
                                                id="companyName"
                                                placeholder="VD: Google, FPT Software, ..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="companySize" className="block text-base font-medium text-gray-700">
                                                Quy mô công ty
                                            </label>
                                            <select
                                                id="companySize"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Chọn quy mô</option>
                                                <option value="startup">Startup (&lt; 50 người)</option>
                                                <option value="small">Công ty nhỏ (50-200 người)</option>
                                                <option value="medium">Công ty vừa (200-1000 người)</option>
                                                <option value="large">Công ty lớn (1000+ người)</option>
                                                <option value="corporation">Tập đoàn</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="companyType" className="block text-base font-medium text-gray-700">
                                                Loại hình công ty
                                            </label>
                                            <select
                                                id="companyType"
                                                className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Chọn loại hình</option>
                                                <option value="local">Công ty trong nước</option>
                                                <option value="foreign">Công ty nước ngoài</option>
                                                <option value="joint">Liên doanh</option>
                                                <option value="government">Cơ quan nhà nước</option>
                                            </select>
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="jobDescription" className="block text-base font-medium text-gray-700">
                                                Mô tả công việc (Job Description)
                                            </label>
                                            <textarea
                                                id="jobDescription"
                                                placeholder="Dán mô tả công việc từ tin tuyển dụng hoặc mô tả chi tiết về công việc bạn muốn ứng tuyển..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="companyValues" className="block text-base font-medium text-gray-700">
                                                Giá trị/Văn hóa công ty
                                            </label>
                                            <textarea
                                                id="companyValues"
                                                placeholder="Mô tả về văn hóa, giá trị của công ty (nếu biết)..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Skills and Experience */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <svg
                                            className="w-7 h-7 text-orange-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <h2 className="text-2xl font-semibold">Kỹ năng và kinh nghiệm</h2>
                                    </div>
                                    <p className="mb-6 text-base text-gray-600">Liệt kê kỹ năng và kinh nghiệm của bạn</p>

                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <label htmlFor="skills" className="block text-base font-medium text-gray-700">
                                                Kỹ năng chính
                                            </label>
                                            <div className="flex gap-3">
                                                <input
                                                    value={newSkill}
                                                    onChange={(e) => setNewSkill(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    placeholder="Nhập kỹ năng và nhấn Enter"
                                                    className="w-full p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={addSkill}
                                                    className="px-5 py-3 text-base bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                                                >
                                                    Thêm
                                                </button>
                                            </div>
                                            {skills.length > 0 && (
                                                <div className="flex flex-wrap gap-3 mt-3">
                                                    {skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="flex items-center gap-2 px-3 py-1.5 text-base bg-gray-200 rounded-md"
                                                        >
                                                            {skill}
                                                            <svg
                                                                className="w-4 h-4 cursor-pointer"
                                                                onClick={() => removeSkill(skill)}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth="2"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="experience" className="block text-base font-medium text-gray-700">
                                                Kinh nghiệm làm việc
                                            </label>
                                            <textarea
                                                id="experience"
                                                placeholder="Mô tả kinh nghiệm làm việc, dự án đã thực hiện..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="education" className="block text-base font-medium text-gray-700">
                                                Học vấn
                                            </label>
                                            <textarea
                                                id="education"
                                                placeholder="Trình độ học vấn, bằng cấp, chứng chỉ..."
                                                className="w-full p-3 text-base border border-gray-300 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-6 mt-8 border-t">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={`px-5 py-3 text-base border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    Quay lại
                                </button>
                                {currentStep < totalSteps ? (
                                    <button
                                        onClick={nextStep}
                                        className="flex items-center gap-2 px-5 py-3 text-base text-white bg-black rounded-md hover:bg-gray-800"
                                    >
                                        Tiếp tục
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <button className="flex items-center gap-2 px-5 py-3 text-base text-white bg-green-600 rounded-md hover:bg-green-700">
                                        Tạo CV
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Help Text */}
                        <div className="mt-8 text-base text-center text-gray-500">
                            <p>Thông tin bạn cung cấp sẽ giúp chúng tôi tạo ra CV phù hợp và chuyên nghiệp nhất</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVInfoForm;
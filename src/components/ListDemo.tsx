import React from 'react';

const ListDemo: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Hướng dẫn sử dụng danh sách đánh số</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Phím tắt:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li><strong>Ctrl + Shift + 7:</strong> Tạo danh sách đánh số</li>
            <li><strong>Ctrl + Shift + 8:</strong> Tạo danh sách không đánh số</li>
            <li><strong>Enter:</strong> Tạo mục mới trong danh sách</li>
            <li><strong>Backspace:</strong> Xóa mục trống trong danh sách</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Ví dụ danh sách đánh số:</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-4">
            <li>Kinh nghiệm làm việc với React</li>
            <li>Thành thạo JavaScript ES6+</li>
            <li>Hiểu biết về TypeScript</li>
            <li>Kỹ năng quản lý dự án</li>
          </ol>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Ví dụ danh sách không đánh số:</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Làm việc nhóm hiệu quả</li>
            <li>Giao tiếp tốt</li>
            <li>Giải quyết vấn đề</li>
            <li>Học hỏi nhanh</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Danh sách lồng nhau:</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-600 ml-4">
            <li>Kỹ năng lập trình
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>JavaScript</li>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </li>
            <li>Kỹ năng mềm
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Giao tiếp</li>
                <li>Lãnh đạo</li>
                <li>Quản lý thời gian</li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-800">💡 Mẹo sử dụng:</h3>
          <ul className="list-disc list-inside space-y-1 text-blue-700">
            <li>Click vào nút danh sách trên thanh công cụ hoặc sử dụng phím tắt</li>
            <li>Nhấn Enter để tạo mục mới trong danh sách</li>
            <li>Nhấn Backspace khi mục trống để xóa mục đó</li>
            <li>Có thể chuyển đổi giữa danh sách đánh số và không đánh số</li>
            <li>Hỗ trợ danh sách lồng nhau với nhiều cấp độ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListDemo; 
class userModel {
    static getSampleData() {
        return ['item1', 'item2', 'item3'];
    }

    static saveData(data) {
        // Logic lưu dữ liệu (ví dụ: vào database)
        console.log('Data saved:', data);
    }
}

module.exports = userModel;
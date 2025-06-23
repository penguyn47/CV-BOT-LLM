const userModel = require('../models/userModel');

exports.getUser = (req, res) => {
    res.json({ success: true, user: { id: 1, name: 'Test User' } });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    res.json({ success: true, message: 'User created', user: newUser });
};

exports.getLayout = (req, res) => {
    const layoutText = "Đây là bố cục CV mẫu từ backend. Hãy tùy chỉnh theo nhu cầu!";
    console.log("aa")
    res.json({ success: true, text: layoutText });
};
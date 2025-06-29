// backend/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route để tạo tip
router.post('/generate-tip', aiController.generateTip);

// Route cho chatbot
router.post('/chat', aiController.getChatResponse);

module.exports = router;
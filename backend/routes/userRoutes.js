const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUser);
router.post('/users', userController.createUser);
router.get('/layout', userController.getLayout); // Thêm route mới

module.exports = router;
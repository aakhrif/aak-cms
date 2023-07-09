const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User registration route
router.post('/register', userController.create);

// User login route
router.post('/login', userController.login);

module.exports = router;

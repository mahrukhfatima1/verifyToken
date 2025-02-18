const express = require('express');
const router = express.Router();
const signupValidation = require('../utilities/signupValidation')
const authController = require('../controllers/authController')

router.post('/signup', signupValidation(), authController.signup);  
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
var express = require('express');
var router = express.Router();
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const signupValidation = require('../utilities/signupValidation')
const verifyToken = require("../middleware/authMiddleware.js");


// Create User
router.post('/', userController.postUser);
router.post('/', signupValidation(), userController.createUser);

router.get("/me", verifyToken, userController.getUserProfile);

// Read All Users
router.get('/', userController.getUser);
// Read One User
router.get("/:id", userController.getUserbyId);

// Update User
router.put('/:id', userController.updateUser);

// Delete User
router.delete('/:id', userController.deleteUser);


module.exports = router;

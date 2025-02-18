const express = require("express");
const { createPost } = require("../controllers/postController.js");
const verifyToken = require("../middleware/authMiddleware.js");

const router = express.Router();
router.post("/", verifyToken, createPost);

module.exports = router;

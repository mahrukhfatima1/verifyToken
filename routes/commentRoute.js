const express = require("express");
const { createComment } = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware.js");

const router = express.Router();
router.post("/", verifyToken, createComment);

module.exports = router;

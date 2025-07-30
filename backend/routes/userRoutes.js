const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/", verifyToken, authorizeRole(1), userController.getAllUsers);

module.exports = router;

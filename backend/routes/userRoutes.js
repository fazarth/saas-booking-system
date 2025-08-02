const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     description: User login with email and password to get a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token.
 *       404:
 *         description: Email not found.
 *       401:
 *         description: Invalid password.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", userController.login);

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               phoneNumber:
 *                 type: string
 *                 example: "+123456789"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City"
 *               roleId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User successfully created.
 *       400:
 *         description: Email already registered or role not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/register", userController.register);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     description: Get a list of all users (requires admin role).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *       403:
 *         description: Access forbidden: insufficient role.
 *       500:
 *         description: Internal server error.
 */
router.get("/", verifyToken, authorizeRole("admin"), userController.getAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();
const c = require("../controllers/userController");

// Auth
router.post("/register-owner", c.registerOwner);
router.post("/register", c.registerUser);
router.post("/login", c.login);

// User CRUD
router.get("/", c.getAll);   
router.get("/:id", c.getById);
router.put("/:id", c.update);
router.delete("/:id", c.delete);

module.exports = router;

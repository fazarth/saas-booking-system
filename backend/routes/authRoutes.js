const express = require("express");
const r = express.Router();
const c = require("../controllers/authController");

r.post("/register-owner", c.registerOwner);
r.post("/register-user", c.registerUser);
r.post("/login", c.login);

module.exports = r;

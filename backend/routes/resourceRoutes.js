const express = require("express");
const r = express.Router();
const { auth, only } = require("../middleware/auth");
const c = require("../controllers/resourceController");

r.post("/", auth, only("Owner","Admin"), c.createResource);
r.get("/", c.listResources);

module.exports = r;

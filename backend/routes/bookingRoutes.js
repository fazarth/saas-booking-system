const express = require("express");
const r = express.Router();
const { auth, only } = require("../middleware/auth");
const c = require("../controllers/bookingController");

r.get("/", c.getAll);
r.get("/:id", c.getById);
r.post("/", auth, only("Customer","Admin"), c.createBooking);
r.put("/:id", auth, only("Owner","Admin"), c.update);
r.patch("/:id/status", auth, only("Owner","Admin"), c.updateStatus);
r.delete("/:id", auth, only("Owner","Admin"), c.delete);

module.exports = r;

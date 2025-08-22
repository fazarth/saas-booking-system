const express = require("express");
const r = express.Router();
const { auth, only } = require("../middleware/auth");
const c = require("../controllers/bookingController");

r.post("/", auth, only("Customer","Admin"), c.createBooking);
r.get("/my", auth, only("Customer","Admin"), c.myBookings);
r.patch("/:id/status", auth, only("Owner","Admin"), c.updateStatus);

module.exports = r;

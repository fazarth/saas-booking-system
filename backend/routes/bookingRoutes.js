const express = require("express");
const r = express.Router();
const { rbac, permissions, auth } = require("../middleware/auth");
const c = require("../controllers/bookingController");

// Semua route butuh auth dulu
r.use(auth);

r.get("/", rbac(permissions.VIEW_OWN_BOOKINGS), c.getAll);
r.get("/:id", rbac(permissions.VIEW_OWN_BOOKINGS), c.getById);
r.post("/", rbac(permissions.CREATE_BOOKING), c.createBooking);
r.put("/:id", rbac(permissions.MANAGE_OWN_RESOURCES), c.update);
r.patch("/:id/status", rbac(permissions.MANAGE_OWN_RESOURCES), c.updateStatus);
r.delete("/:id", rbac(permissions.MANAGE_OWN_RESOURCES), c.delete);

module.exports = r;

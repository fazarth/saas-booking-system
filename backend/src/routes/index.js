const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");
const permissionController = require("../controllers/permissionController");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const rbac = require("../middlewares/rbac");
const isAdmin = require("../middlewares/isAdmin");

const resourceRoutes = require("./resource");
const resourceDetailRoutes = require("./resourceDetail");
const bookingRoutes = require("./booking");
const availabilityRoutes = require("./availability");

const authenticate = require("../middlewares/auth");
const isCustomer = require("../middlewares/isCustomer");
const isOwner = require("../middlewares/isOwner");

// Auth
router.post("/login", authController.login);
router.post("/register", userController.register);
router.get("/validate-admin", authenticate, isAdmin, (req, res) => {
  res.json({ message: "Admin validated" });
});
router.get("/validate-owner", authenticate, isOwner, (req, res) => {
  res.json({ message: "Owner validated" });
});
router.get("/validate-customer", authenticate, isCustomer, (req, res) => {
  res.json({ message: "Customer validated" });
});

// User
router.get("/users", auth, isAdmin, userController.getAll);
router.post("/users/assign-role", auth, isAdmin, userController.assignRole);

// Role
router.post("/roles", auth, isAdmin, roleController.create);
router.get("/roles", auth, isAdmin, roleController.getAll);
router.post(
  "/roles/assign-permission",
  auth,
  isAdmin,
  roleController.assignPermission
);

// Permission
router.post("/permissions", auth, isAdmin, permissionController.create);
router.get("/permissions", auth, isAdmin, permissionController.getAll);

// Example protected route
router.get("/protected", auth, rbac("view_protected"), (req, res) => {
  res.json({ message: "You have access to protected route!" });
});

// Resource CRUD
router.use("/resources", resourceRoutes);
router.use("/resources", resourceDetailRoutes);
router.use("/bookings", bookingRoutes);
router.use("/availability", availabilityRoutes);

module.exports = router;

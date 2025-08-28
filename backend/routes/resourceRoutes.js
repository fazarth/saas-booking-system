const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { rbac, permissions } = require("../middleware/rbac");
const auth = require("../middleware/auth");

// Apply auth middleware to all routes
router.use(auth);

// Public endpoints
router.get("/available", resourceController.getAvailableResources);

// Protected endpoints
router.get("/", rbac(permissions.VIEW_AVAILABLE_RESOURCES), resourceController.getAll);
router.post("/", rbac(permissions.MANAGE_OWN_RESOURCES), resourceController.create);
router.put("/:ResourceId", rbac(permissions.MANAGE_OWN_RESOURCES), resourceController.update);
router.delete("/:ResourceId", rbac(permissions.MANAGE_OWN_RESOURCES), resourceController.delete);

module.exports = router;

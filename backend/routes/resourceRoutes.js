const express = require("express");
const router = express.Router();
const resourceController = require("../controllers/resourceController");
const { rbac, permissions,auth } = require("../middleware/auth");

// Apply auth middleware to all routes
router.use(auth);

// Public endpoints
router.get("/available", resourceController.getAvailableResources);

// Protected endpoints
router.get("/", rbac(auth.VIEW_AVAILABLE_RESOURCES), resourceController.getAll);
router.post("/", rbac(auth.MANAGE_OWN_RESOURCES), resourceController.createResource);
router.put("/:ResourceId", rbac(auth.MANAGE_OWN_RESOURCES), resourceController.update);
router.delete("/:ResourceId", rbac(auth.MANAGE_OWN_RESOURCES), resourceController.deleteResource);

module.exports = router;

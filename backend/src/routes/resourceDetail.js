const express = require('express');
const router = express.Router();
const resourceDetailController = require('../controllers/resourceDetailController');
const auth = require('../middlewares/auth');

// Create detail for resource (owner only)
router.post('/:resourceId/detail', auth, resourceDetailController.createDetail);
// Get detail for resource (owner only)
router.get('/:resourceId/detail', auth, resourceDetailController.getDetail);
router.get('/:resourceId/all', auth, resourceDetailController.getAllDetails);

// Update detail for resource
router.put('/:resourceId/:id', auth, resourceDetailController.updateDetail);
// Delete detail for resource
router.delete('/:resourceId/:id', auth, resourceDetailController.deleteDetail);

module.exports = router;

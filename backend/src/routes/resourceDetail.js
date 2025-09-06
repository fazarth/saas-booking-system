const express = require('express');
const router = express.Router();
const resourceDetailController = require('../controllers/resourceDetailController');
const auth = require('../middlewares/auth');

// Create detail for resource (owner only)
router.post('/:resourceId/detail', auth, resourceDetailController.createDetail);
// Get detail for resource (owner only)
router.get('/:resourceId/detail', auth, resourceDetailController.getDetail);

module.exports = router;

const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const auth = require('../middlewares/auth');
const isOwner = require('../middlewares/isOwner');

// Owner only
router.post('/', auth, isOwner, availabilityController.createSlot);
router.put('/:id', auth, isOwner, availabilityController.updateSlot);
router.delete('/:id', auth, isOwner, availabilityController.deleteSlot);
// Public (lihat slot resource)
router.get('/resource/:resourceId', availabilityController.getSlotsByResource);

module.exports = router;

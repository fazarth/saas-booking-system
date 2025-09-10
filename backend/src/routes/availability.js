const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const auth = require('../middlewares/auth');

// Owner only
router.post('/', auth, availabilityController.createSlot);
router.put('/:id', auth, availabilityController.updateSlot);
router.delete('/:id', auth, availabilityController.deleteSlot);
// Public (lihat slot resource)
router.get('/resource/:resourceId', availabilityController.getSlotsByResource);

module.exports = router;

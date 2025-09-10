const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');

// Cek ketersediaan slot
router.post('/check', auth, bookingController.checkAvailability);
// Booking slot
router.post('/', auth, bookingController.createBooking);
// Lihat booking user
router.get('/my', auth, bookingController.getMyBookings);
// Lihat booking resource
router.get('/resource/:resourceId', auth, bookingController.getResourceBookings);

module.exports = router;

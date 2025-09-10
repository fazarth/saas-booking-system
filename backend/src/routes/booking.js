const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const isCustomer = require('../middlewares/isCustomer');

// Cek ketersediaan slot
router.post('/check', auth, isCustomer, bookingController.checkAvailability);
// Booking slot
router.post('/', auth, isCustomer, bookingController.createBooking);
// Lihat booking user
router.get('/my', auth, bookingController.getMyBookings);
// Lihat booking resource
router.get('/resource/:resourceId', auth, bookingController.getResourceBookings);

module.exports = router;

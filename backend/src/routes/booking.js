const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const isCustomer = require('../middlewares/isCustomer');

// Cek ketersediaan slot detail
router.post('/check', auth, isCustomer, bookingController.checkAvailability);
// Booking slot detail
router.post('/', auth, isCustomer, bookingController.createBooking);
// Lihat booking user
router.get('/my', auth, bookingController.getMyBookings);
// Lihat booking berdasarkan resource detail
router.get('/:resourceId/:resourceDetailId', auth, bookingController.getBookingsByResourceDetail);

module.exports = router;

const { Booking, Resource } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async checkAvailability(req, res) {
    const { resourceId, startTime, endTime } = req.body;
    // Cari booking aktif yang bentrok dengan waktu yang dipilih
    const conflict = await Booking.findOne({
      where: {
        resourceId,
        status: 'booked',
        [Op.or]: [
          {
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime }
          }
        ]
      }
    });
    res.json({ available: !conflict });
  },

  async createBooking(req, res) {
    const userId = req.user.id;
    const { resourceId, startTime, endTime, notes } = req.body;
    // Cek bentrok
    const conflict = await Booking.findOne({
      where: {
        resourceId,
        status: 'booked',
        [Op.or]: [
          {
            startTime: { [Op.lt]: endTime },
            endTime: { [Op.gt]: startTime }
          }
        ]
      }
    });
    if (conflict) return res.status(409).json({ error: 'Slot already booked' });
    // Generate bookingCode sederhana
    const bookingCode = 'BOOK-' + Date.now();
    const booking = await Booking.create({
      userId,
      resourceId,
      startTime,
      endTime,
      status: 'booked',
      bookingCode,
      notes
    });
    res.status(201).json(booking);
  },

  async getMyBookings(req, res) {
    const userId = req.user.id;
    const bookings = await Booking.findAll({ where: { userId }, include: Resource });
    res.json(bookings);
  },

  async getResourceBookings(req, res) {
    const { resourceId } = req.params;
    const bookings = await Booking.findAll({ where: { resourceId }, include: Resource });
    res.json(bookings);
  }
};

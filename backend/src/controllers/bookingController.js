const { Booking, RoomDetail, HealthDetail, VehicleDetail, CourseDetail } = require('../models');
const { Op } = require('sequelize');

const detailModelMap = {
  room: RoomDetail,
  health: HealthDetail,
  vehicle: VehicleDetail,
  course: CourseDetail,
};

module.exports = {
  async checkAvailability(req, res) {
    const { resourceDetailType, resourceDetailId, startTime, endTime } = req.body;
    const model = detailModelMap[resourceDetailType];
    if (!model) return res.status(400).json({ error: 'Invalid resourceDetailType' });

    // Cek booking bentrok
    const conflict = await Booking.findOne({
      where: {
        ResourceDetailType: resourceDetailType,
        ResourceDetailId: resourceDetailId,
        Status: 'booked',
        [Op.or]: [
          { StartTime: { [Op.lt]: endTime }, EndTime: { [Op.gt]: startTime } }
        ]
      }
    });
    res.json({ available: !conflict });
  },

  async createBooking(req, res) {
    const userId = req.user.id;
    const { resourceId, resourceDetailType, resourceDetailId, startTime, endTime, notes } = req.body;
    const model = detailModelMap[resourceDetailType];
    if (!model) return res.status(400).json({ error: 'Invalid resourceDetailType' });

    // Cek bentrok
    const conflict = await Booking.findOne({
      where: {
        ResourceDetailType: resourceDetailType,
        ResourceDetailId: resourceDetailId,
        Status: 'booked',
        [Op.or]: [
          { StartTime: { [Op.lt]: endTime }, EndTime: { [Op.gt]: startTime } }
        ]
      }
    });
    if (conflict) return res.status(409).json({ error: 'Slot already booked' });

    const bookingCode = 'BOOK-' + Date.now();
    const booking = await Booking.create({
      UserId: userId,
      ResourceId: resourceId,
      ResourceDetailType: resourceDetailType,
      ResourceDetailId: resourceDetailId,
      StartTime: startTime,
      EndTime: endTime,
      Status: 'booked',
      BookingCode: bookingCode,
      Notes: notes
    });
    res.status(201).json(booking);
  },

  async getMyBookings(req, res) {
    const userId = req.user.id;
    const bookings = await Booking.findAll({ where: { UserId: userId } });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "Belum ada booking untuk user ini." });
    }
    res.json(bookings);
  },

  async getBookingsByResourceDetail(req, res) {
    const { resourceId, resourceDetailId } = req.params;
    const resource = await require('../models').Resource.findByPk(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource tidak ditemukan." });
    }
    const bookings = await Booking.findAll({
      where: { ResourceId: resourceId, ResourceDetailId: resourceDetailId }
    });
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: "Belum ada booking untuk resource detail ini." });
    }
    res.json(bookings);
  }
};

// controllers/availabilityController.js
const { AvailabilitySlot } = require('../models');

module.exports = {
  async createSlot(req, res) {
    const { resourceId, dayOfWeek, startTime, endTime, startDate, endDate, isActive } = req.body;
    const slot = await AvailabilitySlot.create({
      resourceId, dayOfWeek, startTime, endTime, startDate, endDate, isActive
    });
    res.status(201).json(slot);
  },

  async updateSlot(req, res) {
    const { id } = req.params;
    const { dayOfWeek, startTime, endTime, startDate, endDate, isActive } = req.body;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });

    await slot.update({ dayOfWeek, startTime, endTime, startDate, endDate, isActive });
    res.json(slot);
  },

  async deleteSlot(req, res) {
    const { id } = req.params;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });

    await slot.destroy();
    res.json({ message: 'Slot deleted' });
  },

  async getSlotsByResource(req, res) {
    const { resourceId } = req.params;
    const slots = await AvailabilitySlot.findAll({ where: { resourceId } });
    res.json(slots);
  }
};

const { AvailabilitySlot, Resource, Role, User } = require('../models');

// Helper: cek apakah user punya role owner
async function isOwner(userId) {
  const user = await User.findByPk(userId, { include: Role });
  return user && user.Roles.some(role => role.name === 'owner');
}

module.exports = {
  async createSlot(req, res) {
    const userId = req.user.id;
    const { resourceId, dayOfWeek, startTime, endTime, startDate, endDate, isActive } = req.body;
    // Pastikan resource milik user dan user adalah owner
    const resource = await Resource.findOne({ where: { id: resourceId, ownerId: userId } });
    if (!resource || !await isOwner(userId)) return res.status(403).json({ error: 'Forbidden' });
    const slot = await AvailabilitySlot.create({ resourceId, dayOfWeek, startTime, endTime, startDate, endDate, isActive });
    res.status(201).json(slot);
  },
  async updateSlot(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    // Pastikan resource milik user dan user adalah owner
    const resource = await Resource.findOne({ where: { id: slot.resourceId, ownerId: userId } });
    if (!resource || !await isOwner(userId)) return res.status(403).json({ error: 'Forbidden' });
    const { dayOfWeek, startTime, endTime, startDate, endDate, isActive } = req.body;
    await slot.update({ dayOfWeek, startTime, endTime, startDate, endDate, isActive });
    res.json(slot);
  },
  async deleteSlot(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const slot = await AvailabilitySlot.findByPk(id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    // Pastikan resource milik user dan user adalah owner
    const resource = await Resource.findOne({ where: { id: slot.resourceId, ownerId: userId } });
    if (!resource || !await isOwner(userId)) return res.status(403).json({ error: 'Forbidden' });
    await slot.destroy();
    res.json({ message: 'Slot deleted' });
  },
  async getSlotsByResource(req, res) {
    const { resourceId } = req.params;
    const slots = await AvailabilitySlot.findAll({ where: { resourceId } });
    res.json(slots);
  }
};

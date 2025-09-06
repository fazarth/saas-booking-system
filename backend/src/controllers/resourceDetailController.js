const { Resource, RoomDetail, HealthDetail, VehicleDetail, CourseDetail } = require('../models');

const detailModelMap = {
  room: RoomDetail,
  health: HealthDetail,
  vehicle: VehicleDetail,
  course: CourseDetail,
};

module.exports = {
  async createDetail(req, res) {
    const userId = req.user.id;
    const { resourceId } = req.params;
    const resource = await Resource.findOne({ where: { id: resourceId, ownerId: userId } });
    if (!resource) return res.status(404).json({ error: 'Resource not found or not owned by user' });
    const model = detailModelMap[resource.resourceType];
    if (!model) return res.status(400).json({ error: 'Invalid resourceType' });
    const detail = await model.create({ ...req.body, resourceId });
    res.status(201).json(detail);
  },
  async getDetail(req, res) {
    const userId = req.user.id;
    const { resourceId } = req.params;
    const resource = await Resource.findOne({ where: { id: resourceId, ownerId: userId } });
    if (!resource) return res.status(404).json({ error: 'Resource not found or not owned by user' });
    const model = detailModelMap[resource.resourceType];
    if (!model) return res.status(400).json({ error: 'Invalid resourceType' });
    const detail = await model.findOne({ where: { resourceId } });
    if (!detail) return res.status(404).json({ error: 'Detail not found' });
    res.json(detail);
  },
};

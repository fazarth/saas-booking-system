const { Resource, User, Role } = require('../models');

// Helper: cek apakah user punya role owner
async function isOwner(userId) {
  const user = await User.findByPk(userId, { include: Role });
  return user && user.Roles.some(role => role.name === 'owner');
}

module.exports = {
  async create(req, res) {
    const userId = req.user.id;
    if (!await isOwner(userId)) return res.status(403).json({ error: 'Forbidden' });
    if (!req.body.resourceName || !req.body.resourceType) {
      return res.status(400).json({ error: 'resourceName and resourceType are required' });
    }
    const resources = await Resource.findAll({ where: { ownerId: userId } });
    if (resources.some(resource => resource.resourceName === req.body.resourceName)) {
      return res.status(403).json({ error: 'Resource Name already exists' });
    }
    const { resourceName, resourceType, description } = req.body;
    const resource = await Resource.create({ resourceName, resourceType, description, ownerId: userId });
    res.status(201).json(resource);
  },
  async getAll(req, res) {
    const userId = req.user.id;
    if (!await isOwner(userId)) return res.status(403).json({ error: 'Forbidden' });
    const resources = await Resource.findAll({ where: { ownerId: userId } });
    res.json(resources);
  },
  async getById(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const resource = await Resource.findOne({ where: { id, ownerId: userId } });
    if (!resource) return res.status(404).json({ error: 'Not found' });
    res.json(resource);
  },
  async update(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const resource = await Resource.findOne({ where: { id, ownerId: userId } });
    if (!resource) return res.status(404).json({ error: 'Not found' });
    const { resourceName, resourceType, description } = req.body;
    await resource.update({ resourceName, resourceType, description });
    res.json(resource);
  },
  async delete(req, res) {
    const userId = req.user.id;
    const { id } = req.params;
    const resource = await Resource.findOne({ where: { id, ownerId: userId } });
    if (!resource) return res.status(404).json({ error: 'Not found' });
    await resource.destroy();
    res.json({ message: 'Resource deleted' });
  },
};

const { Role, Permission, RolePermission } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const role = await Role.create({ name, description });
      res.status(201).json(role);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getAll(req, res) {
    const roles = await Role.findAll({ include: Permission });
    res.json(roles);
  },
  async assignPermission(req, res) {
    try {
      const { roleId, permissionId } = req.body;
      await RolePermission.create({ roleId, permissionId });
      res.json({ message: 'Permission assigned to role' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

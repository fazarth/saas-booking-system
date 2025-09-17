const { Permission } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const permission = await Permission.create({ name, description });
      res.status(201).json(permission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getAll(req, res) {
    const permissions = await Permission.findAll();
    res.json(permissions);
  },
};

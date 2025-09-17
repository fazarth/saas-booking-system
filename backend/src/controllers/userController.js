const { User, Role, UserRole } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hash });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async getAll(req, res) {
    const users = await User.findAll({ include: Role });
    res.json(users);
  },
  async assignRole(req, res) {
    try {
      const { userId, roleId } = req.body;
      await UserRole.create({ userId, roleId });
      res.json({ message: 'Role assigned to user' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};

const { User, Role, UserRole } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    try {
      const { fullname, username, email, phoneNumber, address, password, roleType } = req.body;
      
      // Validasi input
      if (!fullname || !email || !username || !password || !roleType) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Buat user baru
      const user = await User.create({
        fullname,
        username,
        email,
        phoneNumber,
        address,
        password: hashedPassword
      });

      // Cari role berdasarkan roleType
      const role = await Role.findOne({ where: { name: roleType } }); // 'owner', 'customer', 'admin'
      if (!role) {
        return res.status(400).json({ error: 'Invalid role type' });
      }

      // Auto assign role ke user
      await UserRole.create({ 
        userId: user.id, 
        roleId: role.id 
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, fullname, email, role: roleType }
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  async register2(req, res) {
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

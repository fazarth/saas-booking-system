const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorResponse = require('../helper/errorResponse');

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username }, include: Role });
    if (!user) return errorResponse(res, 404, 'user_not_found', req.query.lang || 'id');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return errorResponse(res, 401, 'wrong_password', req.query.lang || 'id');
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token });
  },
};

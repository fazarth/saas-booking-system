const { User, Role } = require('../models');

module.exports = async (req, res, next) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const user = await User.findByPk(userId, { include: Role });
  if (!user || !user.Roles.some(role => role.name === 'admin')) {
    return res.status(403).json({ error: 'Forbidden: Admin only' });
  }
  next();
};

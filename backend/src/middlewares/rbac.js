const { User, Role, Permission } = require('../models');

module.exports = (permissionName) => async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    const user = await User.findByPk(userId, { include: { model: Role, include: Permission } });
    const permissions = user.Roles.flatMap(role => role.Permissions.map(p => p.name));
    if (!permissions.includes(permissionName)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

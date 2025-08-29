// middleware/authz.js
const jwt = require("jsonwebtoken");
const db = require("../models");

const roleHierarchy = {
  admin: ['*'], // admin has all permissions
  owner: [
    'manage-own-resources',
    'view-own-bookings',
    'manage-own-bookings',
    'view-own-customers'
  ],
  customer: [
    'view-available-resources',
    'create-booking',
    'view-own-bookings',
    'manage-own-bookings'
  ]
};

const permissions = {
  MANAGE_OWN_RESOURCES: 'manage-own-resources',
  VIEW_OWN_BOOKINGS: 'view-own-bookings',
  MANAGE_OWN_BOOKINGS: 'manage-own-bookings',
  VIEW_OWN_CUSTOMERS: 'view-own-customers',
  VIEW_AVAILABLE_RESOURCES: 'view-available-resources',
  CREATE_BOOKING: 'create-booking'
};

// 1. Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await db.User.findByPk(decoded.id, {
      include: [{ model: db.Role, attributes: ["Name"] }]
    });

    if (!user) throw new Error("User not found");

    req.token = token;
    req.user = user;
    req.user.role = user.Role.Name;
    next();
  } catch (err) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

// 2. RBAC middleware
const resourceOwnershipCheck = async (req) => {
  const { ResourceId } = req.params;
  const resource = await db.Resource.findByPk(ResourceId);
  return resource && resource.OwnerId === req.user.id;
};

const rbac = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user?.role;
      if (!userRole) return res.status(401).json({ error: "Unauthorized" });

      const userPermissions = roleHierarchy[userRole] || [];

      // Admin has all access
      if (userRole === 'admin' || userPermissions.includes('*')) return next();

      // Check permission
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
      }

      // Owner-specific ownership check
      if (userRole === 'owner' && requiredPermission.startsWith('manage-own')) {
        const owns = await resourceOwnershipCheck(req);
        if (!owns) return res.status(403).json({ error: "Forbidden - Not the owner" });
      }

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

// 3. Optional: simple role check
const authorizeRole = (roleName) => (req, res, next) => {
  if (req.user?.role !== roleName) {
    return res.status(403).json({ message: "Access denied. Wrong role." });
  }
  next();
};

module.exports = {
  auth,
  rbac,
  authorizeRole,
  permissions
};

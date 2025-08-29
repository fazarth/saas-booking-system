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

const resourceOwnershipCheck = async (req, db) => {
  const { ResourceId } = req.params;
  const resource = await db.Resource.findByPk(ResourceId);
  return resource && resource.OwnerId === req.user.UniqueID;
};

const rbac = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user?.role;
      
      if (!userRole) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const userPermissions = roleHierarchy[userRole];

      // Admin has all access
      if (userRole === 'admin' || userPermissions.includes('*')) {
        return next();
      }

      // Check specific permissions
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: "Forbidden - Insufficient permissions" });
      }

      // Check resource ownership for owners
      if (userRole === 'owner' && requiredPermission.startsWith('manage-own')) {
        const hasOwnership = await resourceOwnershipCheck(req, req.app.get('db'));
        if (!hasOwnership) {
          return res.status(403).json({ error: "Forbidden - Not the resource owner" });
        }
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = {
  rbac,
  permissions: {
    MANAGE_OWN_RESOURCES: 'manage-own-resources',
    VIEW_OWN_BOOKINGS: 'view-own-bookings',
    MANAGE_OWN_BOOKINGS: 'manage-own-bookings',
    VIEW_OWN_CUSTOMERS: 'view-own-customers',
    VIEW_AVAILABLE_RESOURCES: 'view-available-resources',
    CREATE_BOOKING: 'create-booking'
  }
};

const sequelize = require('../../config/database');
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const UserRole = require('./UserRole');
const RolePermission = require('./RolePermission');
const Resource = require('./Resource');
const RoomDetail = require('./RoomDetail');
const HealthDetail = require('./HealthDetail');
const VehicleDetail = require('./VehicleDetail');
const CourseDetail = require('./CourseDetail');
const Booking = require('./Booking');
const AvailabilitySlot = require('./AvailabilitySlot');

// Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

module.exports = {
  sequelize,
  User,
  Role,
  Permission,
  UserRole,
  RolePermission,
  Resource,
  RoomDetail,
  HealthDetail,
  VehicleDetail,
  CourseDetail,
  Booking,
  AvailabilitySlot
};

// Sync function for migrations
if (require.main === module) {
  sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    process.exit();
  });
}

const Sequelize = require("sequelize");
const sequelize = require("../config/db");

// Import model
const User = require("./user");
const Role = require("./role");

// Definisikan relasi antar model
Role.hasMany(User, { foreignKey: "RoleId" });
User.belongsTo(Role, { foreignKey: "RoleId" });

// Export semua dalam satu objek
module.exports = {
  Sequelize,
  sequelize,
  User,
  Role,
};

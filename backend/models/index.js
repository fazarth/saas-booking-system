// file untuk membuat relasi antar tabel
const sequelize = require('../config/db');
const User = require('./user');
const Role = require('./role');

// Definisikan relasi antar model
Role.hasMany(User, { foreignKey: 'RoleId' });
User.belongsTo(Role, { foreignKey: 'RoleId' });

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Role,
};

module.exports = db;

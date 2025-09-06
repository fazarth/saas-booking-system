const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Role = require('./Role');

const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
  roleId: { type: DataTypes.INTEGER, references: { model: Role, key: 'id' } },
}, {
  tableName: 'user_roles',
  timestamps: false,
});

module.exports = UserRole;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Fullname: {
      type: DataTypes.STRING(100),
    },
    Email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    PhoneNumber: {
      type: DataTypes.STRING(20),
    },
    Address: {
      type: DataTypes.TEXT,
    },
    Password: {
      type: DataTypes.STRING(255),
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'UniqueID',
      },
    },
  },
  {
    tableName: 'User',
    timestamps: false,
  }
);

module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define(
  'Role',
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: 'Role',
    timestamps: false,
  }
);

module.exports = Role;

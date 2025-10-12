const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const User = sequelize.define('User', {
  //Basic Info
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullname: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },

  // Contact Info
  phoneNumber: { type: DataTypes.STRING, allowNull: true },
  address: { type: DataTypes.STRING, allowNull: true },

  // Profile Info
  dateOfBirth: { type: DataTypes.DATE, allowNull: true },
  gender: { type: DataTypes.ENUM('male', 'female'), allowNull: true },
  avatar: { type: DataTypes.STRING, allowNull: true },

  // Status
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  emailVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  lastLogin: { type: DataTypes.DATE, allowNull: true },
  
  // Metadata
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const AvailabilitySlot = sequelize.define('AvailabilitySlot', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ResourceId: { type: DataTypes.INTEGER, allowNull: false },
  ResourceDetailId: { type: DataTypes.INTEGER, allowNull: false },
  ResourceDetailType: { type: DataTypes.STRING, allowNull: false }, // 'room', 'health', etc
  DayOfWeek: DataTypes.STRING,
  StartTime: DataTypes.TIME,
  EndTime: DataTypes.TIME,
  StartDate: DataTypes.DATE,
  EndDate: DataTypes.DATE,
  IsActive: DataTypes.BOOLEAN
}, {
  tableName: 'AvailabilitySlots',
  timestamps: true
});

module.exports = AvailabilitySlot;

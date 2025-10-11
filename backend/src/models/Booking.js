const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Booking = sequelize.define('Booking', {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserId: { type: DataTypes.INTEGER, allowNull: false },
  ResourceId: { type: DataTypes.INTEGER, allowNull: false },
  ResourceDetailId: { type: DataTypes.INTEGER, allowNull: false },
  ResourceDetailType: { type: DataTypes.STRING, allowNull: false }, // 'room', 'health', etc
  StartTime: DataTypes.DATE,
  EndTime: DataTypes.DATE,
  Status: DataTypes.STRING,
  BookingCode: DataTypes.STRING,
  Notes: DataTypes.STRING
}, {
  tableName: 'Bookings',
  timestamps: true
});

module.exports = Booking;

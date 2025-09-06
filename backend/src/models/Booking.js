const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Resource = require('./Resource');
const AvailabilitySlot = require('./AvailabilitySlot');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  startTime: { type: DataTypes.DATE, allowNull: false },
  endTime: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'booked' },
  bookingCode: { type: DataTypes.STRING },
  notes: { type: DataTypes.STRING },
}, {
  tableName: 'bookings',
  timestamps: true,
});

Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Resource, { foreignKey: 'resourceId' });
User.hasMany(Booking, { foreignKey: 'userId' });
Resource.hasMany(Booking, { foreignKey: 'resourceId' });

module.exports = Booking;

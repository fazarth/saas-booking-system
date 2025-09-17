const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Resource = require('./Resource');

const AvailabilitySlot = sequelize.define('AvailabilitySlot', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  dayOfWeek: { type: DataTypes.STRING },
  startTime: { type: DataTypes.TIME },
  endTime: { type: DataTypes.TIME },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'availability_slots',
  timestamps: true,
});

AvailabilitySlot.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(AvailabilitySlot, { foreignKey: 'resourceId' });

module.exports = AvailabilitySlot;

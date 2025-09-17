const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Resource = require('./Resource');

const RoomDetail = sequelize.define('RoomDetail', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  location: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER },
  facilities: { type: DataTypes.STRING },
  floor: { type: DataTypes.STRING },
  pricePerHour: { type: DataTypes.FLOAT },
}, {
  tableName: 'room_details',
  timestamps: true,
});

RoomDetail.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(RoomDetail, { foreignKey: 'resourceId', onDelete: 'CASCADE', hooks: true });

module.exports = RoomDetail;

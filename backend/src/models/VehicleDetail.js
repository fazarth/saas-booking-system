const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Resource = require('./Resource');

const VehicleDetail = sequelize.define('VehicleDetail', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  brand: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  year: { type: DataTypes.INTEGER },
  type: { type: DataTypes.STRING },
  rentalPrice: { type: DataTypes.FLOAT },
  img: { type: DataTypes.STRING },
}, {
  tableName: 'vehicle_details',
  timestamps: true,
});

VehicleDetail.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(VehicleDetail, { foreignKey: 'resourceId', onDelete: 'CASCADE', hooks: true });

module.exports = VehicleDetail;

const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Resource = require('./Resource');

const HealthDetail = sequelize.define('HealthDetail', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  spesialization: { type: DataTypes.STRING },
  clinicAddress: { type: DataTypes.STRING },
  fee: { type: DataTypes.FLOAT },
  durationMin: { type: DataTypes.INTEGER },
}, {
  tableName: 'health_details',
  timestamps: true,
});

HealthDetail.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(HealthDetail, { foreignKey: 'resourceId', onDelete: 'CASCADE', hooks: true });

module.exports = HealthDetail;

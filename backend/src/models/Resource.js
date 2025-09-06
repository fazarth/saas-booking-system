const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const Resource = sequelize.define('Resource', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceName: { type: DataTypes.STRING, allowNull: false },
  resourceType: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  ownerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
}, {
  tableName: 'resources',
  timestamps: true,
});

Resource.belongsTo(User, { foreignKey: 'ownerId' });
User.hasMany(Resource, { foreignKey: 'ownerId' });

module.exports = Resource;

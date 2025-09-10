const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Resource = require('./Resource');

const CourseDetail = sequelize.define('CourseDetail', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  resourceId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' } },
  subject: { type: DataTypes.STRING },
  level: { type: DataTypes.STRING },
  durationPerHours: { type: DataTypes.INTEGER },
  fee: { type: DataTypes.FLOAT },
  courseType: { type: DataTypes.STRING },
}, {
  tableName: 'course_details',
  timestamps: true,
});

CourseDetail.belongsTo(Resource, { foreignKey: 'resourceId' });
Resource.hasMany(CourseDetail, { foreignKey: 'resourceId', onDelete: 'CASCADE', hooks: true });

module.exports = CourseDetail;

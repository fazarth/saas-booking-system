const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HealthDetail = sequelize.define("healthDetail", {
  UniqueID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ResourceId: { type: DataTypes.INTEGER, allowNull: false },
  DoctorName: DataTypes.STRING(150),
  Specialization: DataTypes.STRING(150),
  Price: DataTypes.DECIMAL(12, 2),
  Description: DataTypes.TEXT,
}, { tableName: "HealthDetail", timestamps: false });

module.exports = HealthDetail;

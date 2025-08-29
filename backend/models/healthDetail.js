const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HealthDetail = sequelize.define(
  "HealthDetail",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ResourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Specialization: DataTypes.STRING,
    ClinicAddress: DataTypes.STRING,
    Fee: DataTypes.DECIMAL(10, 2),
    DurationMin: DataTypes.INTEGER,
  },
  {
    tableName: "healthdetail",
    timestamps: false,
  }
);

module.exports = HealthDetail;

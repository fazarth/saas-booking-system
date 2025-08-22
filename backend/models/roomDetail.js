const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoomDetail = sequelize.define("roomDetail", {
  UniqueID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ResourceId: { type: DataTypes.INTEGER, allowNull: false },
  RoomNumber: DataTypes.STRING(50),
  Capacity: DataTypes.INTEGER,
  Price: DataTypes.DECIMAL(12, 2),
  Description: DataTypes.TEXT,
}, { tableName: "RoomDetail", timestamps: false });

module.exports = RoomDetail;

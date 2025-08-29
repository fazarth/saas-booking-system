const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoomDetail = sequelize.define(
  "RoomDetail",
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
    Location: DataTypes.STRING,
    Capacity: DataTypes.INTEGER,
    Facilities: DataTypes.STRING,
    Floor: DataTypes.STRING,
    PricePerHour: DataTypes.DECIMAL(10, 2),
  },
  {
    tableName: "roomdetail",
    timestamps: false,
  }
);

module.exports = RoomDetail;

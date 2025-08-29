const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoomBookingDetail = sequelize.define(
  "RoomBookingDetail",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    BookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RoomDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ExtraInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "roombookingdetail",
    timestamps: false,
  }
);

module.exports = RoomBookingDetail;

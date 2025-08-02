const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Booking = sequelize.define(
  "booking",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "UniqueID",
      },
    },
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rooms",
        key: "UniqueID",
      },
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM("pending", "confirmed", "canceled"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "Booking",
    timestamps: false,
  }
);

module.exports = Booking;
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Checkin = sequelize.define(
  "Checkin",
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
    Method: DataTypes.STRING,
  },
  {
    tableName: "checkin",
    timestamps: false,
  }
);

module.exports = Checkin;

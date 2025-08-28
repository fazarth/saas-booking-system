const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AvailabilitySlots = sequelize.define(
  "AvailabilitySlots",
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
    DayOfWeek: DataTypes.INTEGER,
    StartTime: DataTypes.TIME,
    EndTime: DataTypes.TIME,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    IsActive: DataTypes.BOOLEAN,
  },
  {
    tableName: "availabilityslots",
    timestamps: false,
  }
);

module.exports = AvailabilitySlots;

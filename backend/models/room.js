const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Room = sequelize.define(
  "room",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PricePerHour: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "Room",
    timestamps: false,
  }
);

Room.associate = (models) => {
  Room.hasMany(models.RoomFacility, { foreignKey: "RoomId" });
  Room.hasMany(models.AvailabilitySlot, { foreignKey: "RoomId" });
};

module.exports = Room;
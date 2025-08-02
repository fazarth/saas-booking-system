const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AvailabilitySlot = sequelize.define(
  "availabilitySlot",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    IsAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "AvailabilitySlot",
    timestamps: false,
  }
);

AvailabilitySlot.associate = (models) => {
  AvailabilitySlot.belongsTo(models.Room, { foreignKey: "RoomId" });
};

module.exports = AvailabilitySlot;
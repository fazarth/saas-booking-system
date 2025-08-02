const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RoomFacility = sequelize.define(
  "roomFacility",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FacilityName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    RoomId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Rooms", // Relasi dengan tabel Room
        key: "UniqueID",
      },
    },
  },
  {
    tableName: "RoomFacility",
    timestamps: false,
  }
);

RoomFacility.associate = (models) => {
  RoomFacility.belongsTo(models.Room, { foreignKey: "RoomId" });
};

module.exports = RoomFacility;
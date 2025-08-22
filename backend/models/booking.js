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
      allowNull: false,
    },
    ResourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.ENUM("Pending", "Confirmed", "Cancelled"),
      defaultValue: "Pending",
    },
    BookingCode: {
      type: DataTypes.STRING(50),
      unique: true,
    },
  },
  {
    tableName: "booking",
    timestamps: true,
  }
);

Booking.associate = (models) => {
  Booking.belongsTo(models.Resource, { foreignKey: "ResourceId" });
  Booking.belongsTo(models.User, { foreignKey: "UserId" });
};

module.exports = Booking;

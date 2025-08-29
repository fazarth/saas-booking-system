const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Resource = sequelize.define(
  "Resource",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: DataTypes.STRING,
    BookingType: DataTypes.STRING,
    ResourceType: DataTypes.STRING,
    Description: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN,
  },
  {
    tableName: "resource",
    timestamps: true,
  }
);

// Relasi
Resource.associate = (models) => {
  Resource.hasMany(models.Booking, { foreignKey: "ResourceId" });
  Resource.hasOne(models.RoomDetail, { foreignKey: "ResourceId" });
  Resource.hasOne(models.HealthDetail, { foreignKey: "ResourceId" });
  Resource.hasMany(models.AvailabilitySlots, { foreignKey: "ResourceId" });
};

module.exports = Resource;

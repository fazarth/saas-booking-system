const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Resource = sequelize.define(
  "resource",
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
    ResourceType: {
      type: DataTypes.ENUM("room", "health"),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "resource",
    timestamps: false,
  }
);

Resource.associate = (models) => {
  Resource.hasMany(models.Booking, { foreignKey: "ResourceId" });
};

module.exports = Resource;

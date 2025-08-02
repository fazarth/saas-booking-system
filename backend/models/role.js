const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "role",
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
  },
  {
    tableName: "role",
    timestamps: false,
  }
);

Role.associate = (models) => {
  Role.hasMany(models.User, { foreignKey: "RoleId" });
};

module.exports = Role;

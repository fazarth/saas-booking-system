const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Role = sequelize.define(
  "Role",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "role",
    timestamps: false,
  }
);

// Relasi
Role.associate = (models) => {
  Role.hasMany(models.User, { foreignKey: "RoleId" });
};

module.exports = Role;

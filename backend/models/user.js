const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fullname: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Address: DataTypes.STRING,
    Password: DataTypes.STRING,
    RoleId: DataTypes.INTEGER,
  },
  {
    tableName: "user",
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.Password) {
          user.Password = await bcrypt.hash(user.Password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("Password")) {
          user.Password = await bcrypt.hash(user.Password, 10);
        }
      },
    },
  }
);

// Relasi
User.associate = (models) => {
  User.belongsTo(models.Role, { foreignKey: "RoleId" });
  User.hasMany(models.Booking, { foreignKey: "UserId" });
};

module.exports = User;

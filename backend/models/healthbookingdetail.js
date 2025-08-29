const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const HealthBookingDetail = sequelize.define(
  "HealthBookingDetail",
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
    StartTime: DataTypes.DATE,
    EndTime: DataTypes.DATE,
    Status: DataTypes.STRING,
    BookingCode: DataTypes.STRING,
    Notes: DataTypes.STRING,
  },
  {
    tableName: "healthbookingdetail",
    timestamps: false,
  }
);

// Relasi
HealthBookingDetail.associate = (models) => {
  HealthBookingDetail.belongsTo(models.User, { foreignKey: "UserId" });
  HealthBookingDetail.belongsTo(models.Resource, { foreignKey: "ResourceId" });
};

module.exports = HealthBookingDetail;

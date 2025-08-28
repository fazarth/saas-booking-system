const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const QueueTickets = sequelize.define(
  "QueueTickets",
  {
    UniqueID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    BookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TicketNumber: DataTypes.STRING,
    Status: DataTypes.STRING,
    CalledAt: DataTypes.DATE,
    EndAt: DataTypes.DATE,
  },
  {
    tableName: "queuetickets",
    timestamps: false,
  }
);

// Relasi
QueueTickets.associate = (models) => {
  QueueTickets.belongsTo(models.Booking, { foreignKey: "BookingId" });
};

module.exports = QueueTickets;

"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("queuetickets", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      BookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "booking", key: "UniqueID" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      TicketNumber: Sequelize.STRING,
      Status: Sequelize.STRING,
      CalledAt: Sequelize.DATE,
      EndAt: Sequelize.DATE,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("queuetickets");
  },
};

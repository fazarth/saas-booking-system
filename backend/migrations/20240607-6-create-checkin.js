"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("checkin", {
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
      Method: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("checkin");
  },
};

"use strict";
  module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resource", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: Sequelize.STRING,
      BookingType: Sequelize.STRING,
      ResourceType: Sequelize.STRING,
      Description: Sequelize.STRING,
      IsActive: Sequelize.BOOLEAN,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("resource");
  },
};

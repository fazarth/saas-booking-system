"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Roles", {
      UniqueID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Roles");
  },
};

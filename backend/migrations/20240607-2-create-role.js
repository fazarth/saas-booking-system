"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("role", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("role");
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Resources", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ResourceType: {
        type: Sequelize.ENUM("room", "health"),
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Resources");
  },
};

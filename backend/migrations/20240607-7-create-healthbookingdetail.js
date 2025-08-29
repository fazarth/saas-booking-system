"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("healthbookingdetail", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user", key: "UniqueID" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ResourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "resource", key: "UniqueID" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      StartTime: Sequelize.DATE,
      EndTime: Sequelize.DATE,
      Status: Sequelize.STRING,
      BookingCode: Sequelize.STRING,
      Notes: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("healthbookingdetail");
  },
};

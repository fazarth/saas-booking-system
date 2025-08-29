"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("booking", {
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
      StartTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EndTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Status: {
        type: Sequelize.ENUM("Pending", "Confirmed", "Cancelled"),
        defaultValue: "Pending",
      },
      BookingCode: {
        type: Sequelize.STRING(50),
        unique: true,
      },
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
    await queryInterface.dropTable("booking");
  },
};

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "UniqueID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ResourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Resources",
          key: "UniqueID",
        },
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
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};

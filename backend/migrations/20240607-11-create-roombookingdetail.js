"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roombookingdetail", {
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
      RoomDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "roomdetail", key: "UniqueID" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Notes: Sequelize.STRING,
      ExtraInfo: Sequelize.STRING,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roombookingdetail");
  },
};

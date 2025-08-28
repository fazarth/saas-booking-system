"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("availabilityslots", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ResourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "resource", key: "UniqueID" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      DayOfWeek: Sequelize.INTEGER,
      StartTime: Sequelize.TIME,
      EndTime: Sequelize.TIME,
      StartDate: Sequelize.DATE,
      EndDate: Sequelize.DATE,
      IsActive: Sequelize.BOOLEAN,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("availabilityslots");
  },
};

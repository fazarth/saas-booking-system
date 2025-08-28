"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("healthdetail", {
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
      Specialization: Sequelize.STRING,
      ClinicAddress: Sequelize.STRING,
      Fee: Sequelize.DECIMAL(10, 2),
      DurationMin: Sequelize.INTEGER,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("healthdetail");
  },
};

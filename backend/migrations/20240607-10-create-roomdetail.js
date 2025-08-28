"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roomdetail", {
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
      Location: Sequelize.STRING,
      Capacity: Sequelize.INTEGER,
      Facilities: Sequelize.STRING,
      Floor: Sequelize.STRING,
      PricePerHour: Sequelize.DECIMAL(10, 2),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("roomdetail");
  },
};

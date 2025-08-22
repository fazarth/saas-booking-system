"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Fullname: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      Email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true,
      },
      PhoneNumber: {
        type: Sequelize.STRING(20),
      },
      Address: {
        type: Sequelize.STRING,
      },
      Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "UniqueID",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};

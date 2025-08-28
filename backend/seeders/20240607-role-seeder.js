"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("role", [
      { Name: "admin" },
      { Name: "owner" },
      { Name: "customer" }
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("role", null, {});
  }
};

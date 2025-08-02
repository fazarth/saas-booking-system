module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Rooms", [
      {
        Name: "Meeting Room A",
        Location: "Building 1",
        Capacity: 10,
        PricePerHour: 100,
      },
      {
        Name: "Conference Room B",
        Location: "Building 2",
        Capacity: 20,
        PricePerHour: 200,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Rooms", null, {});
  },
};

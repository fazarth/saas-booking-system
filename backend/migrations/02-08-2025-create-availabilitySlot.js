module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AvailabilitySlots", {
      UniqueID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      RoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "UniqueID",
        },
      },
      StartTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      EndTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      IsAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AvailabilitySlots");
  },
};
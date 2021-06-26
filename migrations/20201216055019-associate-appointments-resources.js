"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("AppointmentResources", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      AppointmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      ResourceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("AppointmentResources");
  },
};

"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Resources",
      [...Array(20)].map(() => ({
        name: faker.vehicle.vehicle(),
        type: faker.vehicle.type(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Resources", null, {});
  },
};

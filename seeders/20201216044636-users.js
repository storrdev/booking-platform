"use strict";

const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [...Array(100)].map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        sub: uuidv4(),
        email: faker.internet.email(),
        phone: `+1${faker.phone.phoneNumberFormat().replace(/-/gi, "")}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

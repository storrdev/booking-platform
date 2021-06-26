"use strict";

const faker = require("faker");
const moment = require("moment");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    const users = await queryInterface.sequelize.query("SELECT id from Users", {
      type: Sequelize.QueryTypes.SELECT,
    });
    const userIds = users.map(({ id }) => id);

    try {
      await queryInterface.bulkInsert(
        "Appointments",
        [...Array(200)].map(() => {
          const start = faker.date.soon();
          const end = faker.date.between(
            start,
            new moment(start).add(6, "h").toDate()
          );
          return {
            UserId: faker.random.arrayElement(userIds),
            start,
            end,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }),
        { transaction }
      );

      const appointments = await queryInterface.sequelize.query(
        "SELECT id from Appointments",
        {
          transaction,
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      const appointmentIds = appointments.map(({ id }) => id);

      const resources = await queryInterface.sequelize.query(
        "SELECT id from Resources",
        {
          transaction,
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      const resourceIds = resources.map(({ id }) => id);

      const appointmentResources = appointmentIds.map((AppointmentId) => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        AppointmentId,
        ResourceId: faker.random.arrayElement(resourceIds),
      }));

      await queryInterface.bulkInsert(
        "AppointmentResources",
        appointmentResources,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Appointments", null, {});
    await queryInterface.bulkDelete("AppointmentResources", null, {});
  },
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    createTransactions = true;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsToMany(models.Resource, { through: "AppointmentResources" });
    }

    // afterCreate(appointment, data, transaction) {
    //   appointment.addResource(data.ResourceId, { transaction });
    // }
  }
  Appointment.init(
    {
      start: { allowNull: false, type: DataTypes.DATE },
      end: { allowNull: false, type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "Appointment",
      validate: {
        endDateAfterStartDate() {
          if (this.start > this.end) {
            throw new Error("Start date must be before end date");
          }
        },
      },
    }
  );
  return Appointment;
};

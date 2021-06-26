"use strict";
const { Model } = require("sequelize");
const validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Appointment);
    }
  }
  User.init(
    {
      firstName: { allowNull: false, type: DataTypes.STRING },
      lastName: { allowNull: false, type: DataTypes.STRING },
      sub: { allowNull: false, type: DataTypes.STRING, unique: true },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isMobilePhone(val) {
            if (!validator.isMobilePhone(val, "en-US")) {
              throw new Error("Only valid US phone numbers are allowed");
            }

            if (!val.includes("+1")) {
              throw new Error("Phone number must include country code");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

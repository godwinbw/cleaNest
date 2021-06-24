const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Chore = require("./Chore");

class Recurring_Pattern extends Model {}

Recurring_Pattern.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_daily: {
      type: DataTypes.BOOLEAN,
    },
    is_weekly: {
      type: DataTypes.BOOLEAN,
    },
    is_monthly: {
      type: DataTypes.BOOLEAN,
    },
    day_of_week: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 6,
      },
    },
    week_of_month: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 4,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "recurring_pattern",
  }
);

module.exports = Recurring_Pattern;

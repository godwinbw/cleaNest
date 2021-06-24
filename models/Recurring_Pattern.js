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
        isValidDayOfWeek(value) {
          if (parseInt(value) < 0) {
            throw new Error("day of week must be between 0-6");
          } else if (parseInt(value) > 6) {
            throw new Error("day of week must be between 0-6");
          }
        },
      },
    },
    week_of_month: {
      type: DataTypes.INTEGER,
      validate: {
        isValidWeekOfMonth(value) {
          if (parseInt(value) < 1) {
            throw new Error("week of month must be 1,2,3 or 4");
          } else if (parseInt(value) > 4) {
            throw new Error("week of month must be 1,2,3 or 4");
          }
        },
      },
    },
  },
  {
    sequelize,
    validate: {
      atLeastOneFreqencyTrue() {
        if (!(this.is_daily || this.is_weekly || this.is_monthly)) {
          throw new Error(
            "At least one frequency (daily, weekly, or monthly) must be true"
          );
        }
      },
    },
    freezeTableName: true,
    underscored: true,
    modelName: "recurring_pattern",
  }
);

module.exports = Recurring_Pattern;

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Task = require("./Task");
const Category = require("./Category");
const Recurring_Pattern = require("./Recurring_Pattern");

class Chore extends Model {}

Chore.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id",
      },
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
    },
    recurring_pattern_id: {
      references: {
        model: "Recurring_Pattern",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "chore",
  }
);

module.exports = Chore;

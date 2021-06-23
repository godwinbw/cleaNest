const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Chore = require("./Chore");

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

module.exports = Category;

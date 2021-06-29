const sequelize = require("../config/connection");
const { Category } = require("../models");

const categoryData = [
  {
    name: "Kitchen",
  },
  {
    name: "Bedroom",
  },
  {
    name: "Living Room",
  },
  {
    name: "Lisa Bedroom",
  },
  {
    name: "Bart Bedroom",
  },
  {
    name: "Kids Bathroom",
  },
  {
    name: "Bathroom",
  },
];

const categorySeeds = () =>
  Category.bulkCreate(categoryData, { individualHooks: true, validate: true });

module.exports = categorySeeds;

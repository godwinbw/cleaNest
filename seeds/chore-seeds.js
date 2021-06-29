const sequelize = require("../config/connection");
const { Chore } = require("../models");

const choreData = [
  {
    name: "Wash the Dishes",
    category_id: 1,
    is_recurring: true,
    recurring_pattern_id: 1,
  },
  {
    name: "Take out Trash",
    category_id: 1,
    is_recurring: true,
    recurring_pattern_id: 1,
  },
  {
    name: "Mop the Floor",
    category_id: 1,
    is_recurring: true,
    recurring_pattern_id: 8,
  },
  {
    name: "Change bed sheets",
    category_id: 4,
    is_recurring: true,
    recurring_pattern_id: 8,
  },
  {
    name: "Change bed sheets",
    category_id: 5,
    is_recurring: true,
    recurring_pattern_id: 8,
  },
  {
    name: "Change bed sheets",
    category_id: 6,
    is_recurring: true,
    recurring_pattern_id: 8,
  },
  {
    name: "Clean Bathroom",
    category_id: 6,
    is_recurring: true,
    recurring_pattern_id: 6,
  },
  {
    name: "Clean Bathroom",
    category_id: 7,
    is_recurring: true,
    recurring_pattern_id: 6,
  },
  {
    name: "Vacuum Carpet",
    category_id: 2,
    is_recurring: true,
    recurring_pattern_id: 5,
  },
  {
    name: "Vacuum Carpet",
    category_id: 3,
    is_recurring: true,
    recurring_pattern_id: 5,
  },
  {
    name: "Vacuum Carpet",
    category_id: 4,
    is_recurring: true,
    recurring_pattern_id: 5,
  },
  {
    name: "Vacuum Carpet",
    category_id: 5,
    is_recurring: true,
    recurring_pattern_id: 5,
  },
];

const choreSeeds = () => Chore.bulkCreate(choreData, { validate: true });

module.exports = choreSeeds;

const sequelize = require("../config/connection");
const { Recurring_Pattern } = require("../models");

const patternData = [
  {
    name: "Daily",
    is_daily: true,
    is_weekly: false,
    is_monthly: false,
    day_of_week: null,
    week_of_month: null,
  },
  {
    name: "Weekly Sunday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 0,
    week_of_month: null,
  },
  {
    name: "Weekly Monday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 1,
    week_of_month: null,
  },
  {
    name: "Weekly Tuesday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 2,
    week_of_month: null,
  },
  {
    name: "Weekly Wednesday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 3,
    week_of_month: null,
  },
  {
    name: "Weekly Thursday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 4,
    week_of_month: null,
  },
  {
    name: "Weekly Friday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 5,
    week_of_month: null,
  },
  {
    name: "Weekly Saturday",
    is_daily: false,
    is_weekly: true,
    is_monthly: false,
    day_of_week: 6,
    week_of_month: null,
  },
  {
    name: "Monthly - 1st week Monday",
    is_daily: false,
    is_weekly: false,
    is_monthly: true,
    day_of_week: 1,
    week_of_month: 1,
  },
  {
    name: "Monthly - 2nd week Wednesday",
    is_daily: false,
    is_weekly: false,
    is_monthly: true,
    day_of_week: 3,
    week_of_month: 2,
  },
  {
    name: "Monthly - 4th week Friday",
    is_daily: false,
    is_weekly: false,
    is_monthly: true,
    day_of_week: 5,
    week_of_month: 4,
  },
  {
    name: "Monthly - 1st week Friday",
    is_daily: false,
    is_weekly: false,
    is_monthly: true,
    day_of_week: 5,
    week_of_month: 1,
  },
];

const patternSeeds = () =>
  Recurring_Pattern.bulkCreate(patternData, {
    individualHooks: true,
    validate: true,
  });

module.exports = patternSeeds;

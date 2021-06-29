const sequelize = require("../config/connection");
const { Task } = require("../models");

const taskData = [
  {
    chore_id: 4,
    user_id: 4,
    due_date: "2021-07-03",
    complete: false,
  },
  {
    chore_id: 5,
    user_id: 3,
    due_date: "2021-07-03",
    complete: false,
  },
  {
    chore_id: 6,
    user_id: 1,
    due_date: "2021-07-03",
    complete: false,
  },
  {
    chore_id: 10,
    user_id: 3,
    due_date: "2021-06-30",
    complete: false,
  },
  {
    chore_id: 11,
    user_id: 4,
    due_date: "2021-06-30",
    complete: false,
  },
];
//console.log("hello", Task);
const taskSeeds = () =>
  Task.bulkCreate(taskData, { individualHooks: true, validate: true });

module.exports = taskSeeds;

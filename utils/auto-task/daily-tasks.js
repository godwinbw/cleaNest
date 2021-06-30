const sequelize = require("../../config/connection");
const { Chore, Recurring_Pattern, Task } = require("../../models");
const withAuth = require("../auth");
const createTasks = require("./create-tasks");

const dailyTaskCreation = () => {
  console.log("....starting NODE-CRON daily task creation!");

  // find all CHORES that have a recurring pattern of "is_daily"
  Chore.findAll({
    attributes: ["id", "name", "category_id"],
    include: [
      {
        model: Recurring_Pattern,
        attributes: [
          "id",
          "name",
          "is_daily",
          "is_weekly",
          "is_monthly",
          "day_of_week",
          "week_of_month",
        ],
        where: {
          is_daily: true,
        },
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        // there are no chores with "is_daily" recurring pattern
        console.log("...there are no chores with a DAILY frequency");
        return;
      }

      // create an array of next 7 days (including today)
      const daysArray = [];
      for (let i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + i);
        daysArray.push(d.toISOString().slice(0, 10));
      }

      // now we need to create the tasks
      // we will want to create a DAILY tasks for each of days in the days array

      console.log(" **** DAILY CHORES ****");
      dbData.forEach((chore) => {
        //console.log("chore : " + chore.name);
        createTasks(chore, daysArray);
      });

      //console.log(JSON.stringify(dbData));
      console.log(" **********************");

      return;
    })
    .catch((err) => {
      console.log(err);
      return;
    });
};

module.exports = dailyTaskCreation;

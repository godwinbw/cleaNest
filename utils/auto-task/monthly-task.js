const sequelize = require("../../config/connection");
const { Chore, Recurring_Pattern, Task } = require("../../models");
const withAuth = require("../auth");

const monthlyTaskCreation = () => {
  console.log("....starting NODE-CRON monthly task creation!");

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
          is_monthly: true,
        },
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        // there are no chores with "is_daily" recurring pattern
        console.log("...there are no chores with a MONTHLY frequency");
        return;
      }

      // now we need to create the tasks
      console.log(" **** MONTHLY CHORES ****");
      dbData.forEach((chore) => {
        console.log("chore : " + chore.name);
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

module.exports = monthlyTaskCreation;

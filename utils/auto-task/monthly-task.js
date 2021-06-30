const sequelize = require("../../config/connection");
const { Chore, Recurring_Pattern, Task } = require("../../models");
const withAuth = require("../auth");
const createTasks = require("./create-tasks");
const { getDisplayDate, getWeekOfMonth } = require("../date-utils");

const monthlyTaskCreation = () => {
  console.log("....starting NODE-CRON monthly task creation!");

  // find all CHORES that have a recurring pattern of "is_monthly"
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
        //console.log("chore : " + chore.name);

        // find the date over the next 7 days that has the same day of week as this chore
        let daysArray = [];
        for (let i = 0; i < 7; i++) {
          var d = new Date();
          d.setDate(d.getDate() + i);
          if (d.getDay() == chore.recurring_pattern.day_of_week) {
            // this day of week matches, we need to check the week of the month to see if it matches
            let weekOfMonth = getWeekOfMonth(d.toISOString().slice(0, 10));
            if (weekOfMonth == chore.recurring_pattern.week_of_month) {
              daysArray.push(d.toISOString().slice(0, 10));
            }
          }
        }

        // now create the task for this chore and days
        if (daysArray.length > 0) {
          createTasks(chore, daysArray);
        } else {
          console.log("  --- NOT creating tasks for ----");
          console.log("   dates -> " + JSON.stringify(daysArray));
          console.log("   chore -> " + chore.name);
          console.log("         ");
          console.log("   is_daily -> " + chore.recurring_pattern.is_daily);
          console.log("   is_weekly -> " + chore.recurring_pattern.is_weekly);
          console.log("   is_monthly -> " + chore.recurring_pattern.is_monthly);
          console.log(
            "   day_of_week -> " + chore.recurring_pattern.day_of_week
          );
          console.log(
            "   week_of_month -> " + chore.recurring_pattern.week_of_month
          );
          console.log("  -----------------------------------");
        }
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

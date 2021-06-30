const {
  Chore,
  Category,
  Recurring_Pattern,
  User,
  Task,
} = require("../../models");

const createTasks = (chore, daysArray) => {
  // get a chore that we want to create a task for
  // daysArray has a list of dates that the task should be created for

  //console.log("  --- need to create tasks ----");
  //console.log("   dates -> " + JSON.stringify(daysArray));
  //console.log("   chore -> " + chore.name);
  //console.log("         ");
  //console.log("   is_daily -> " + chore.recurring_pattern.is_daily);
  //console.log("   is_weekly -> " + chore.recurring_pattern.is_weekly);
  //console.log("   is_monthly -> " + chore.recurring_pattern.is_monthly);
  //console.log("   day_of_week -> " + chore.recurring_pattern.day_of_week);
  //console.log("   week_of_month -> " + chore.recurring_pattern.week_of_month);
  //console.log("  -----------------------------------");

  daysArray.forEach((day) => {
    // we need to see if a task already exists with this chore id for the given day.
    // if it doesn't, we need to create one
    //console.log(
    //  "finding existing tasks for chore_id " + chore.id + " and due_date " + day
    //);

    Task.findAll({
      attributes: ["id", "chore_id", "due_date", "complete"],
      where: {
        chore_id: chore.id,
        due_date: day,
      },
    })
      .then((dbData) => {
        if (!dbData) {
          return;
        } else {
          if (dbData.length > 0) {
            // tasks already exist for this chore_id and due_date
            //console.log("--task already exsit");
            dbData.forEach((task) => {
              //console.log("   -- task id : " + task.id);
            });
          } else {
            // no task exists, we need to create one
            //console.log(
            //  "--NEED TO CREATE TASKS FOR CHORE ID " +
            //    chore.id +
            //    " DUE_DATE " +
            //    day
            //);
            Task.create({
              chore_id: chore.id,
              due_date: day,
            })
              .then((dbData) => {
                //console.log("--task CREATED!");
                return;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = createTasks;

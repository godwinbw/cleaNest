const { getDisplayDate, getWeekOfMonth } = require("./date-utils");

const getDailyTaskList = (taskList) => {
  //console.log("**** getDaiyTaskList START...");
  //console.log("taskList -> ", taskList);

  const dailyTaskList = {};

  // build a list of due_dates
  taskList.forEach((task) => {
    // create key for due date
    if (!(task.due_date in dailyTaskList)) {
      let displayDate = getDisplayDate(task.due_date);

      dailyTaskList[task.due_date] = {
        due_date: task.due_date,
        display_date: displayDate,
        categories: {},
      };
    }

    // create key for category
    if (
      !(task.chore.category.name in dailyTaskList[task.due_date]["categories"])
    ) {
      dailyTaskList[task.due_date]["categories"][task.chore.category.name] = {
        name: task.chore.category.name,
        tasks: {},
      };
    }

    // now add task
    dailyTaskList[task.due_date]["categories"][task.chore.category.name][
      "tasks"
    ][task.id] = task;

    //console.log("added task -> ", task);
  });

  // now return the list as an array
  console.dir("dailyTaskList -> ", dailyTaskList);
  return dailyTaskList;
};

module.exports = getDailyTaskList;

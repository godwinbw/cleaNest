const dailyTaskCreation = require("./daily-tasks");
const weeklyTaskCreation = require("./weekly-task");
const monthlyTaskCreation = require("./monthly-task");

const createRecurringTasks = () => {
  dailyTaskCreation();
  weeklyTaskCreation();
  monthlyTaskCreation();
};

module.exports = createRecurringTasks;

const cron = require("node-cron");
const createRecurringTasks = require("../utils/auto-task/");

const every5seconds = "*/5 * * * * *";
const every20minutes = "0 */20 * * * *";
const every20seconds = "*/20 * * * * *";
const oncePerDayAt2am = "0 0 2 * * *";

// create a task scheduler that will execute on the desired frequency
const taskScheduler = cron.schedule(
  oncePerDayAt2am,
  function () {
    const d = new Date();
    console.log("Node-Cron ...checking daily at 2 am minutes", d);
    createRecurringTasks();
  },
  {
    scheduled: false,
  }
);

module.exports = { taskScheduler, createRecurringTasks };

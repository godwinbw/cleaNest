const cron = require("node-cron");
const createRecurringTasks = require("../utils/auto-task/");

const every5seconds = "*/5 * * * * *";
const every10minutes = "0 */10 * * * *";
const every20seconds = "*/20 * * * * *";

// create a task scheduler that will execute on the desired frequency
const taskScheduler = cron.schedule(
  every20seconds,
  function () {
    const d = new Date();
    console.log("Node-Cron ...Every 20 seconds", d);
    createRecurringTasks();
  },
  {
    scheduled: false,
  }
);

module.exports = { taskScheduler, createRecurringTasks };

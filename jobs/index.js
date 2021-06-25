const jobs = [
  // run daily-tasks.js 5 secnods after startup, then every 5 seconds
  {
    name: "daily-tasks",
    timeout: "5s",
    interval: "5s",
  },

  // run weekly-tasks.js 10 seconds after startup, then eveyr 5 seconds
  {
    name: "weekly-tasks",
    timeout: "10s",
    interval: "5s",
  },

  // run monthly-tasks.js 15 seconds after startup, then every 5 seconds
  {
    name: "monthly-tasks",
    timout: "15s",
    interval: "10s",
  },
];

module.exports = jobs;

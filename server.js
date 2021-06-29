const path = require("path");
const express = require("express");

const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const { session, sessionConfig } = require("./config/session");

const {
  taskScheduler,
  createRecurringTasks,
} = require("./config/task-scheduler");

app.use(session(sessionConfig));

//const helpers = require("./utils/helpers");

const hbs = exphbs.create({ });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.get('/', (req, res) => {


  res.render('homepage');
});
app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Now listening...");

    // check for creating recurring tasks whenever we start
    createRecurringTasks();

    // then start the task scheduler to create recurring tasks on the schedule
    taskScheduler.start();
    console.log("Started NODE-CRON task scheduler...");
  });
});

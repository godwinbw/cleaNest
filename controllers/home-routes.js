const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Chore, Task, Recurring_Pattern, User } = require("../models");
const getDailyTaskList = require("../utils/daily-task-list");

// get all tasks for next seven days for homepage

router.get("/", (req, res) => {
  console.log("======================");

  // determine the dates we need to search for
  // create an array of next 7 days (including today)
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() + i);
    daysArray.push(d.toISOString().slice(0, 10));
  }

  //console.log(" --- days arrary -> ", daysArray);

  Task.findAll({
    attributes: ["id", "due_date", "complete"],
    order: [["due_date", "ASC"]],
    where: {
      due_date: daysArray,
    },
    include: [
      {
        model: User,
        attributes: ["id", "display_name"],
      },
      {
        model: Chore,
        attributes: ["id", "name", "is_recurring"],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
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
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      const tasks = dbData.map((task) => task.get({ plain: true }));

      // we need to sort tasks by due_date, within due_date by category
      const dailyTaskList = getDailyTaskList(tasks);
      console.log("dailyTaskList -> ", dailyTaskList);

      res.render("homepage", {
        dailyTaskList,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// route for user signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// route for home
router.get("/home", (req, res) => {
  res.redirect("/");
  return;
});

module.exports = router;

const router = require("express").Router();
const sequelize = require("../config/connection");
const { Category, Chore, Task, Recurring_Pattern, User } = require("../models");
const withAuth = require("../utils/auth");
const getDailyTaskList = require("../utils/daily-task-list");

// get all tasks that belong to the user
// only get tasks for the next 7 days

router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  console.log("======================");

  // determine the dates we need to search for
  // create an array of next 7 days (including today)
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() + i);
    daysArray.push(d.toISOString().slice(0, 10));
  }

  Task.findAll({
    attributes: ["id", "due_date", "complete"],
    order: [["due_date", "ASC"]],
    where: {
      due_date: daysArray,
      user_id: req.session.user_id,
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

      res.render("dashboard", {
        dailyTaskList,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a singel task to mark as complete or not
router.get("/edit/:id", withAuth, (req, res) => {
  Task.findByPk(req.params.id, {
    attributes: ["id", "due_date", "complete"],
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
      if (dbData) {
        const post = dbData.get({ plain: true });
        console.log("*** task data ***");
        console.log(task);

        res.render("complete-task", {
          task,
          loggedIn: true,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;

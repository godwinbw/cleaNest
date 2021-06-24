const router = require("express").Router();
const sequelize = require("../../config/connection");
const {
  Chore,
  Category,
  Recurring_Pattern,
  User,
  Task,
} = require("../../models");
const withAuth = require("../../utils/auth");

// get ALL Tasks
router.get("/", (req, res) => {
  console.log("======================");
  Task.findAll({
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
        ],
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
          },
        ],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a TASK by ID
router.get("/:id", (req, res) => {
  console.log("======================");
  Task.findOne({
    where: {
      id: req.params.id,
    },
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
        ],
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
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tasks found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new Task (requires logged in user)
router.post("/", withAuth, (req, res) => {
  // expects {chore_id: 3, due_date: "2020-07-14"}
  Task.create({
    chore_id: req.body.chore_id,
    due_date: req.body.due_date,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a Task (requires logged in User)
router.put("/:id", withAuth, (req, res) => {
  // update using request body, only update what has changed
  Task.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No tasks found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a Task (requries logged in USER)
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Task.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No task found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

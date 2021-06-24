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

// get ALL chores
router.get("/", (req, res) => {
  console.log("======================");
  Chore.findAll({
    attributes: ["id", "name"],
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
      {
        model: Task,
        attributes: ["id", "due_date", "complete"],
        include: [
          {
            model: User,
            attributes: ["id", "display_name"],
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

// get a CHORE by ID
router.get("/:id", (req, res) => {
  console.log("======================");
  Chore.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
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
      {
        model: Task,
        attributes: ["id", "due_date", "complete"],
        include: [
          {
            model: User,
            attributes: ["id", "display_name"],
          },
        ],
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No chore found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new Chore (requires logged in user)
router.post("/", withAuth, (req, res) => {
  // expects {name: 'Scrub floor', category_id: 3, is_recurring: true, recurring_pattern_id: 3}
  Chore.create({
    name: req.body.name,
    category_id: req.body.category_id,
    is_recurring: req.body.is_recurring,
    recurring_pattern_id: req.body.recurring_pattern_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a Chore (requires logged in User
router.put("/:id", withAuth, (req, res) => {
  // expects {title: 'new post!', content: 'this is new content', user_id: 1}
  Chore.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No chore found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a Chore (requries logged in USER)
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Chore.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No chore found with this id" });
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

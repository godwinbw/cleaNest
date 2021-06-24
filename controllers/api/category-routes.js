const router = require("express").Router();
const {
  Category,
  Chore,
  Recurring_Pattern,
  Task,
  User,
} = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// get all categories
router.get("/", (req, res) => {
  Category.findAll({
    attributes: ["id", "name"],
    include: [
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
        include: [
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
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a Category by id
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
    include: [
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
        include: [
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
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new Category (requires a logged in USER)
router.post("/", withAuth, (req, res) => {
  // expects => {name: "Kitchen"}
  Category.create({
    name: req.body.name,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE a Category (requires a logged in USER)
router.put("/:id", withAuth, (req, res) => {
  Category.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a Category (requires a logged in USER)
router.delete("/:id", withAuth, (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No category found with this id" });
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

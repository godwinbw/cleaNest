const router = require("express").Router();
const { Category, Chore, Recurring_Pattern } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// get all categories
router.get("/", (req, res) => {
  Category.findAll({
    attributes: [
      "id",
      "name",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM chore WHERE category.id = chore.category_id)"
        ),
        "chore_count",
      ],
    ],
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
    attributes: [
      "id",
      "name",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM chore WHERE category.id = chore.category_id)"
        ),
        "chore_count",
      ],
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new Category (requires a logged in USER)
router.post("/", withAuth, (req, res) => {
  // expects => {name: "Kitchen"}
  Comment.create({
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
  Comment.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
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
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: "No comment found with this id for this user!" });
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

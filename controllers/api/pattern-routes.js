const router = require("express").Router();
const { Recurring_Pattern } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// get all recurring patterns
router.get("/", (req, res) => {
  Recurring_Pattern.findAll({
    attributes: [
      "id",
      "name",
      "is_daily",
      "is_weekly",
      "is_monthly",
      "day_of_week",
      "week_of_month",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM chore WHERE recurring_pattern.id = chore.recurring_pattern_id)"
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

// get a recurring pattern by id
router.get("/:id", (req, res) => {
  Recurring_Pattern.findAll({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
      "is_daily",
      "is_weekly",
      "is_monthly",
      "day_of_week",
      "week_of_month",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM chore WHERE recurring_pattern.id = chore.recurring_pattern_id)"
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

// create a new Recurring Pattern (requires a logged in USER)
router.post("/", withAuth, (req, res) => {
  // expects => {name: "Daily Monday", is_daily: false, is_weekly: false, is_monthly: false, day_of_week: null, week_of_momth: null}
  Comment.create({
    name: req.body.name,
    is_daily: req.body.is_daily,
    is_weekly: req.body.is_weekly,
    is_monthly: req.body.is_monthly,
    day_of_week: req.body.day_of_week,
    week_of_month: req.body.week_of_month,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE a Category (requires a logged in USER)
router.put("/:id", withAuth, (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: "No recurring pattern found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a Recurring Pattern (requires a logged in USER)
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
          .json({ message: "No recurring pattern found with this id!" });
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

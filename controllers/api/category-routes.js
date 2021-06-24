const router = require("express").Router();
const { Category } = require("../../models");
const withAuth = require("../../utils/auth");

// get all categories
router.get("/", (req, res) => {
  Category.findAll({
    attributes: [
      "id",
      "name",
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

// get a Category by id
router.get("/:id", (req, res) => {
  Category.findAll({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "name",
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

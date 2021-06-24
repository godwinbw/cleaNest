const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Chore, Category, Recurring_Pattern } = require("../../models");
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
  Post.findAll({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "name"],
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
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// CREATE a new post (requires logged in user)
router.post("/", withAuth, (req, res) => {
  // expects {title: 'new post!', content: 'this is new content', user_id: 1}
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// UPDATE a POST (requires logged in User, user can only update their own posts
router.put("/:id", withAuth, (req, res) => {
  // expects {title: 'new post!', content: 'this is new content', user_id: 1}
  Post.update(
    {
      title: req.body.title,
      content: req.body.content,
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
        res
          .status(404)
          .json({ message: "No post found with this id for this user" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a POST (requries logged in USER, user can only delete their own posts)
router.delete("/:id", withAuth, (req, res) => {
  console.log("id", req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res
          .status(404)
          .json({ message: "No post found with this id for this user" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET all posts for a given user ID
router.get("/users/:user_id", (req, res) => {
  console.log("======================");
  Post.findAll({
    where: {
      user_id: req.params.user_id,
    },
    attributes: [
      "id",
      "title",
      "content",
      "created_at",
      "updated_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
        ),
        "comment_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: [
          "id",
          "comment_text",
          "post_id",
          "user_id",
          "created_at",
          "updated_at",
        ],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
      {
        model: User,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

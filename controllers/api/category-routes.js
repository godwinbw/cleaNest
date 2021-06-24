const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", (req, res) => {
  Comment.findAll({})
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a comment by id
router.get("/:id", (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all comments for a given user id
router.get("/users/:user_id", (req, res) => {
  Comment.findAll({
    where: {
      user_id: req.params.user_id,
    },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all comments for a given post id
router.get("/posts/:post_id", (req, res) => {
  Comment.findAll({
    where: {
      post_id: req.params.post_id,
    },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new comment
router.post("/", withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE a comment (requires a logged in USER, must be same user that created the comment)
router.put("/:id", withAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.comment_text,
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

// DELETE a comment (requires a logged in USER, must be same user that created the comment)
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

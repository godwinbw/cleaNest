const router = require("express").Router();
const { User, Task, Chore, Category } = require("../../models");

// get all users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a user by ID
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Task,
        attributes: ["id", "due_date", "complete"],
        include: {
          model: Chore,
          attributes: ["id", "name"],
          include: {
            model: Category,
            attributes: ["id", "name"],
          },
        },
      },
    ],
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new user
router.post("/", (req, res) => {
  // expects {username: 'electro', displayname: 'Electro Man', password: 'spark'}
  User.create({
    displayname: req.body.displayname,
    username: req.body.username,
    password: req.body.password,
  })
    .then((dbData) => {
      req.session.save(() => {
        req.session.user_id = dbData.id;
        req.session.username = dbData.username;
        req.session.loggedIn = true;

        res.json(dbData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// LOGIN a user
router.post("/login", (req, res) => {
  // expects {username: 'electro', password: 'spark'}
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbData) => {
    if (!dbData) {
      res.status(400).json({ message: "No user with that username!" });
      return;
    }

    const validPassword = dbData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.username = dbData.username;
      req.session.loggedIn = true;

      res.json({ user: dbData, message: "You are now logged in!" });
    });
  });
});

// logout a USER
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE a user
router.put("/:id", (req, res) => {
  // expects {username: 'electro', displayname: 'Electro Man', password: 'spark'}
  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a user
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({ message: "No user found with this id" });
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

require("dotenv").config();
const sequelize = require("./connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// session will expire after 30 minutes of inactivity
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 60 * 1000 * 30,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

module.exports = { session, sessionConfig };

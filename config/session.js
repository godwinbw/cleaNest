require("dotenv").config();

// session will expire after 5 minutes of inactivity
const sessionConfig = {
  secret: rocess.env.SESSION_SECRET,
  cookie: {
    maxAge: 60 * 1000 * 5,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

module.exports = sessionConfig;

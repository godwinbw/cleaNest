const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    displayName: "Homer Simpson",
    username: "homer",
    password: "password123",
  },
  {
    displayName: "Marge Simpson",
    username: "marge",
    password: "password123",
  },
  {
    displayName: "Bart Simpson",
    username: "bart",
    password: "password123",
  },
  {
    displayName: "Lisa Simpson",
    username: "lisa",
    password: "password123",
  },
];
//console.log("hello");
const seedUsers = () =>
  User.bulkCreate(userdata, { individualHooks: true, validate: true });

/*
const seedUsers = function() {
  return Promise.all([
    User.create(userdata[0]),
    User.create(userdata[1]),
    User.create(userdata[2]),
    User.create(userdata[3]),
  ]);
};
*/

module.exports = seedUsers;

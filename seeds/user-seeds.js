const sequelize = require("../config/connection");
const { User } = require("../models");

const userdata = [
  {
    displayName: "Clark Kent",
    username: "SuperMan",
    password: "password123",
  },
  {
    displayName: "Diana Prince",
    username: "WonderWoman",
    password: "password123",
  },
  {
    displayName: "Bruce Banner",
    username: "Hulk",
    password: "password123",
  },
  {
    displayName: "Steve Rogers",
    username: "CapAmerica",
    password: "password123",
  },
  {
    displayName: "Selina Kyle",
    username: "CatWoman",
    password: "password123",
  },
];
console.log("hello");
const seedUsers = () =>
  User.bulkCreate(userdata, { individualHooks: true, validate: true });

module.exports = seedUsers;

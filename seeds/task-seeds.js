const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Bryan',
    email: 'godwin.bryan.w@gmail.com',
    password: 'password123',
  },
  {
    username: 'Yajaira',
    email: 'yygrace03@gmail.com',
    password: 'password123',
  },
  {
    username: 'Colin',
    email: 'reinhardtc22@gmail.com',
    password: 'password123',
  },
  {
    username: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123',
  },
  {
    username: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123',
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;

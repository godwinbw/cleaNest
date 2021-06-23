const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Clark',
    email: 'ckent@dailymetropois.com',
    password: 'password123',
  },
  {
    username: 'Lois',
    email: 'llane@gmail.com',
    password: 'password123',
  },
  {
    username: 'Bruce',
    email: 'bbanner@gmail.com',
    password: 'password123',
  },
  {
    username: 'Steve',
    email: 'srogers@gmail.com',
    password: 'password123',
  },
  {
    username: 'Selina',
    email: 'skyle@gmail.com',
    password: 'password123',
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;

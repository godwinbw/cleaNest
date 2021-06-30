const userSeeds = require('./user-seeds');
const taskSeeds = require('./task-seeds');
const choreSeeds = require('./chore-seeds');
const categorySeeds = require('./category-seeds');
const patternSeeds = require('./pattern-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log('--------------');
	await userSeeds();
	console.log('----Users Seeded----------');

	await categorySeeds();
	console.log('----Categories Seeded----------');

	await patternSeeds();
	console.log('----Patterns Seeded----------');

	await choreSeeds();
	console.log('----Chores Seeded----------');

	await taskSeeds();
	console.log('----Tasks Seeded----------');

	process.exit(0);
};

seedAll();

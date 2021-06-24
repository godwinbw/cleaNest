const userSeeds = require('./user-seeds');
const taskSeeds = require('./task-seeds');
const choreSeeds = require('./chore-seeds');
const categorySeeds = require('./category-seeds');
const patternSeeds = require('./pattern-seeds');

const sequelize = require('sequelize');

const seedAll = async () => {
	await sequelize.sync({ force: true });
	console.log('--------------');
	await userSeeds();
	console.log('--------------');

	await taskSeeds();
	console.log('--------------');

	await choreSeeds();
	console.log('--------------');

	await categorySeeds();
	console.log('--------------');

	await patternSeeds();
	console.log('--------------');

	process.exit(0);
};

seedAll();

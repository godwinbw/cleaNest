const sequelize = require('../config/connection');
const { Category } = require('../models');

const categoryData = [
	{
		name: 'Kitchen',
	},
	{
		name: 'Bedroom',
	},
	{
		name: 'Living Room',
	},
	{
		name: 'Kids Bedroom',
	},
	{
		name: 'Upstairs Bathroom',
	},
	{
		name: 'Downstairs Bathroom',
	},
];

const categorySeeds = () => Category.bulkCreate(categoryData, { individualHooks: true });

module.exports = categorySeeds;

const sequelize = require('../config/connection');
const { Chore } = require('../models');

const choreData = [
	{
		name: 'wash the dishes',
		category_id: 1,
		is_recurring: true,
		recurring_pattern_id: 1,
	},
	{
		name: 'wash the floor',
		category_id: 1,
		is_recurring: true,
		recurring_pattern_id: 8,
	},
	{
		name: 'Take out the trash',
		category_id: 1,
		is_recurring: true,
		recurring_pattern_id: 9,
	},
	{
		name: 'Hang curtains',
		category_id: 3,
		is_recurring: false,
		recurring_pattern_id: null,
	},
	{
		name: 'Pack up decorations',
		category_id: 3,
		is_recurring: false,
		recurring_pattern_id: null,
	},
	{
		name: 'Pack up decorations',
		category_id: 3,
		is_recurring: true,
		recurring_pattern_id: 12,
	},
];

const choreSeeds = () => Chore.bulkCreate(choreData, { individualHooks: true });

module.exports = choreSeeds;

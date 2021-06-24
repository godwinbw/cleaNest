const sequelize = require('../config/connection');
const { Recurring_Pattern } = require('../models');

const patternData = [
	{
		name: 'Daily Monday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 1,
		week_of_month: null,
	},
	{
		name: 'Daily Tuesday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 2,
		week_of_month: null,
	},
	{
		name: 'Daily Wednesday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 3,
		week_of_month: null,
	},
	{
		name: 'Daily Thursday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 4,
		week_of_month: null,
	},
	{
		name: 'Daily Friday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 5,
		week_of_month: null,
	},
	{
		name: 'Daily Saturday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 6,
		week_of_month: null,
	},
	{
		name: 'Daily Sunday',
		is_daily: true,
		is_weekly: false,
		is_monthly: false,
		day_of_week: 7,
		week_of_month: null,
	},
	{
		name: 'Weekly, First Week',
		is_daily: false,
		is_weekly: true,
		is_monthly: false,
		day_of_week: 0,
		week_of_month: 0,
	},
	{
		name: 'Weekly, Second Week',
		is_daily: false,
		is_weekly: true,
		is_monthly: false,
		day_of_week: 1,
		week_of_month: 1,
	},
	{
		name: 'Weekly, Third Week',
		is_daily: false,
		is_weekly: true,
		is_monthly: false,
		day_of_week: 1,
		week_of_month: 2,
	},
	{
		name: 'Weekly, Fourth Week',
		is_daily: false,
		is_weekly: true,
		is_monthly: false,
		day_of_week: 1,
		week_of_month: 3,
	},
	{
		name: 'Monthly',
		is_daily: false,
		is_weekly: false,
		is_monthly: true,
		day_of_week: 6,
		week_of_month: 1,
	},
];

const patternSeeds = () => Recurring_Pattern.bulkCreate(patternData, { individualHooks: true });

module.exports = patternSeeds;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const Chore = require('./Chore');

class Recurring_Pattern extends Model {}

Recurring_Pattern.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
	},
	is_daily: {
		type: DataTypes.BOOLEAN,
	},
	is_weekly: {
		type: DataTypes.BOOLEAN,
	},
	is_monthly: {
		type: DataTypes.BOOLEAN,
	},
	day_of_week: {
		type: DataTypes.INTEGER,
	},
	week_of_month: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Recurring_Pattern;

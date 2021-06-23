const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const User = require('./User');
const Chore = require('./Chore');

class Task extends Model {}

Task.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	chore_id: {
		type: DataTypes.INTEGER,
		references: {
			model: 'chore',
			key: 'id',
		},
	},
	user_id: {
		type: DataTypes.INTEGER,
		references: {
			model: 'user',
			key: 'id',
		},
	},
	due_date: {
		type: DataTypes.DATE,
	},
	complete: {
		type: DataTypes.BOOLEAN,
	},
});

module.exports = Task;

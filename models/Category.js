const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const Chore = require('./Chore');

class Chore extends Model {}

Chore.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
	},
});

module.exports = Chore;

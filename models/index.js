const User = require('./User');
const Task = require('./Task');
const Chore = require('./Chore');
const Category = require('./Category');
const Recurring_Pattern = require('./Recurring_Pattern');

// associations
User.hasMany(Task, {
	foreignKey: 'user_id',
});

const User = require('./User');
const Task = require('./Task');
const Chore = require('./Chore');
const Category = require('./Category');
const Recurring_Pattern = require('./Recurring_Pattern');

// associations
User.hasMany(Task, {
	foreignKey: 'user_id',
});

User.hasMany(Chore);

Task.belongsTo(User, {
	foreignKey: 'chore_id',
});

// task has/belongs to chore?
// chore has/belongs to task?

Chore.hasOne(Category, {
	foreignKey: 'id',
});

Chore.hasOne(Recurring_Pattern, {
	foreignKey: 'id',
});

Recurring_Pattern.hasMany(Chore);

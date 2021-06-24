const Category = require('./Category');
const Recurring_Pattern = require('./Recurring_Pattern');
const Chore = require('./Chore');
const Task = require('./Task');
const User = require('./User');

// // User Assocations

// // a User has many tasks
// User.hasMany(Task);

// // Task Associations

// // a TASK belongs to one user
// Task.belongsTo(User, {
// 	foreignKey: 'user_id',
// 	onDelete: 'SET NULL',
// });

// // a TASK belongs to one USER
// Task.belongsTo(User, {
// 	foreignKey: 'user_id',
// });

// // Chore associations

// // a CHORE belongs to a TASK
// Chore.belongsTo(Task, {
// });

// // a CHORE has one CATEGORY
// Chore.hasOne(Category, {
// 	foreignKey: 'category_id',
// });

// // a CHORE has one RECURRING PATTERN
// Chore.hasOne(Recurring_Pattern, {
// 	foreignKey: 'recurring_pattern_id',
// });

module.exports = { Category, Chore, Recurring_Pattern, Task, User };

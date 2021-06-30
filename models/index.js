const Category = require("./Category");
const Recurring_Pattern = require("./Recurring_Pattern");
const Chore = require("./Chore");
const Task = require("./Task");
const User = require("./User");

// // USER & TASK Assocations
// A user can have many tasks
// a task belongs to one user

User.hasMany(Task, {
  foreignKey: "user_id",
});

Task.belongsTo(User, {
  foreignKey: "user_id",
});

// TASK & CHORE Associations
// A Tash belongs to one Chore
Task.belongsTo(Chore, {
  foreignKey: "chore_id",
});

Chore.hasMany(Task, {
  foreignKey: "chore_id",
});

// CHORE & CATEGORY Assocation
// A chore has one category
// A category has many chores
Chore.belongsTo(Category, {
  foreignKey: "category_id",
});

Category.hasMany(Chore, {
  foreignKey: "category_id",
});

// CHORE & RECURRING_PATTERN Associations
// a chore has one recurring pattern
// a recurring patern has many chores
Chore.belongsTo(Recurring_Pattern, {
  foreignKey: "recurring_pattern_id",
});

Recurring_Pattern.hasMany(Chore, {
  foreignKey: "recurring_pattern_id",
});

module.exports = { Category, Chore, Recurring_Pattern, Task, User };

const User = require("./User");
const Task = require("./Task");
const Chore = require("./Chore");
const Category = require("./Category");
const Recurring_Pattern = require("./Recurring_Pattern");

// *** USER associations ***
//
// a USER has many tasks
User.hasMany(Task, {
  foreignKey: "user_id",
});

// a TASK belongs to one user
Task.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// *** TASK associations
//
// a TASK is a type a single CHORE
Task.hasOne(Chore, {
  foreignKey: "chore_id",
});

// a CHORE can have many TASKS
Chore.hasMany(Task, {
  foreignKey: "chore_id",
});

// *** CHORE associations
//
// a CHORE has one CATEGORY

Chore.hasOne(Category, {
  foreignKey: "category_id",
});

// a CATEGORY can have many CHORES
Category.hasMany(Chore, {
  foreignKey: "category_id",
});

// a CHORE has one RECURRING PATTERN
Chore.hasOne(Recurring_Pattern, {
  foreignKey: "recurring_pattern_id",
});

// a RECURRING PATTERN can have many CHORES
Recurring_Pattern.hasMany(Chore, {
  foreignKey: "recurring_pattern_id",
});

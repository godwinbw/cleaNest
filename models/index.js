const Category = require("./Category");
const Recurring_Pattern = require("./Recurring_Pattern");
const Chore = require("./Chore");
const Task = require("./Task");
const User = require("./User");

/*

// a TASK belongs to one user
Task.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

// a CHORE belongs to a TASK
Task.hasOne(Chore, {
  foreignKey: "chore_id",
});


// *** CHORE associations
//
// a CHORE has one CATEGORY

Chore.hasOne(Category, {
  foreignKey: "category_id",
});

// a CHORE has one RECURRING PATTERN
Chore.hasOne(Recurring_Pattern, {
  foreignKey: "recurring_pattern_id",
});

*/

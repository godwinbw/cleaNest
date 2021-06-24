const router = require("express").Router();

const userRoutes = require("./user-routes.js");
const categoryRoutes = require("./category-routes.js");
const choreRoutes = require("./chore-routes.js");
const patternRoutes = require("./pattern-routes.js");
const taskRoutes = require("./task-routes.js");

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/chores", choreRoutes);
router.use("/patterns", patternRoutes);
//router.use("/tasks", taskRoutes);

module.exports = router;

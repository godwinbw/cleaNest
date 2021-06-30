const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const unassignedRoutes = require("./unassigned-routes.js");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/unassigned/", unassignedRoutes);
router.use("/api", apiRoutes);

module.exports = router;

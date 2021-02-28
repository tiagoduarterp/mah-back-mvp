const express = require("express");
const router  = express.Router();
const userRoutes = require('./user');
const testRoutes = require('./test')

router.use("/user", userRoutes);
router.use("/test", testRoutes);



module.exports = router;
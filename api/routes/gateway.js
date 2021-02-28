const express = require("express");
const router  = express.Router();
const userRoutes = require('./user');
const testRoutes = require('./test')

router.use("/user", userRoutes);
router.use("/user", testRoutes);



module.exports = router;
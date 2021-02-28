const express        = require("express");
const router         = express.Router();
const testController = require("../controllers/testController");

router.get('/a', testController.teste)



module.exports = router;
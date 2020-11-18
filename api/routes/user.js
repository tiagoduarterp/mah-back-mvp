const express        = require("express");
const router         = express.Router();
const checkAuth      = require("../middleware/check-auth");
const userController = require("../controllers/userController");

/* testeToken */

router.post('/login', userController.userLogin)
router.post('/createuser', userController.createUser)
router.get('/teste',checkAuth, userController.testeToken)


module.exports = router;
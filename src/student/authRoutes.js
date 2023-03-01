const {Router} = require("express");
const controller = require('./controller');
const checkAuth = require("../../middleware/checkAuth");

const router = Router();


router.get("/register" , controller.register);
router.get("/login" , controller.login);
router.get("/dashboard" ,checkAuth,controller.dashboard);

module.exports = router;
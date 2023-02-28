const {Router} = require("express");
const controller = require('./controller');

const router = Router();


router.get("/register" , controller.register);
router.get("/login" , controller.login);
router.get("/dashboard" ,controller.dashboard);

module.exports = router;
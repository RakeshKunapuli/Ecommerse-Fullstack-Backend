const express = require("express");
const userController = require("../Controller/User.controller");
const router = express.Router();
const validate = require("../MiddleWares/Checks.middleware");

router.post("/signup", userController.signUp);
router.post("/login",userController.login);
router.get("/allUsers",userController.allusers)

module.exports = router;

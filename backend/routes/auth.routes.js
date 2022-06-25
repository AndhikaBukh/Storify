const express = require("express");
const router = express.Router();

// Controllers
const authCtrl = require("../controllers/auth.controller");

router.post("/register", authCtrl.register);

router.post("/login", authCtrl.login);

router.post("/forgotpassword", authCtrl.forgotPassword);

router.put("/resetpassword/:resetToken", authCtrl.resetPassword);

router.post("/logout", authCtrl.logout);

module.exports = router;
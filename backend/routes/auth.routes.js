const express = require("express");
const router = express.Router();

// Controllers
const authCtrl = require("../controllers/auth.controller");

router.post("/auth/register", authCtrl.register); // http://localhost:3000/api/auth/register

router.post("/auth/login", authCtrl.login); // http://localhost:3000/api/auth/login

router.post("/auth/forgotpassword", authCtrl.forgotPassword); // http://localhost:3000/api/auth/forgotpassword

router.put("/auth/resetpassword/:resetToken", authCtrl.resetPassword); // http://localhost:3000/api/auth/resetpassword/:resetToken

router.post("/auth/logout", authCtrl.logout); // http://localhost:3000/api/auth/logout

module.exports = router;

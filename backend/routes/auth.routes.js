const express = require("express");
const router = express.Router();

// Controllers
const {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.put("/resetpassword/:resetToken", resetPassword);

router.post("/logout", logout);

module.exports = router;
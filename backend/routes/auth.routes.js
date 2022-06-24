const express = require("express");
const router = express.Router();

// Controllers
const {
    login,
    register,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotPassword);

router.put("/passwordreset/:resetToken", resetPassword);

module.exports = router;
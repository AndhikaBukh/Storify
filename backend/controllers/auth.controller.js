const User = require("../models/user.model");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const sendCookie = require("../utils/sendCookie");
const EmailCtrl = require("./email.controller");
const VerifyToken = require("../models/verifyToken.model");

exports.register = async (req, res, next) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        !username && next(new ErrorResponse("Please provide username", 400));

        !username && next(new ErrorResponse('USERNAME&Please provide username', 400));

        username.length < 5 && next(new ErrorResponse('USERNAME&Username must be at least 5 characters', 400));

        !email && next(new ErrorResponse('EMAIL&Please provide a email', 400));
        !email.includes('@') && next(new ErrorResponse('EMAIL&Please provide a valid email', 400));

        !password && next(new ErrorResponse('PASSWORD&Please provide a password', 400));

        !confirmPassword && next(new ErrorResponse('PASSWORDCONFIRM&Please confirm your password', 400));

        if (password !== confirmPassword) {
            next(new ErrorResponse('PASSWORDMATCH&Password and Confirm Password must be same', 400));
        } else {
            const user = await User.create({
                name,
                username,
                email,
                password,
            });

            const otp = EmailCtrl.generateOTP();

            const verifyToken = await VerifyToken.create({
                userId: user._id,
                token: otp,
            });

            EmailCtrl.verifyEmail(email, otp);

            sendCookie(user, 201, res);
        }
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

exports.resendOTP = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        const verifyToken = await VerifyToken.findOne({
            userId: user._id,
        });

        verifyToken.remove();

        const otp = EmailCtrl.generateOTP();

        await VerifyToken.create({
            userId: user._id,
            token: otp,
        });

        EmailCtrl.verifyEmail(req.body.email, otp);

        res.status(200).json({
            message: "See your email now",
        });
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

exports.verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.body;

        const user = await User.findOne({ email: req.query.email });
        const verifyToken = await VerifyToken.findOne({ userId: user._id });

        !user && next(new ErrorResponse("No user with this email", 404));
        !verifyToken && next(new ErrorResponse("Invalid Token", 400));
        user.verified && next(new ErrorResponse("Email already verified", 400));
        verifyToken.token != token && next(new ErrorResponse("Blok", 400));

        if (verifyToken.token == token) {
            user.verified = true;
            await user.save();
            await verifyToken.remove();
            sendCookie(user, 200, res);
        }
    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    !email ||
        (!password &&
            next(new ErrorResponse("Email or Password is wrong!", 400)));

    !email.includes("@") &&
        next(new ErrorResponse("Please provide a valid email", 400));

    try {
        const user = await User.findOne({
            email,
        }).select("+password");

        !user && next(new ErrorResponse("Email or Password is wrong!", 400));

        const isMatch = await user.matchPasswords(password);
        !isMatch && next(new ErrorResponse("Password is wrong!", 400));

        sendCookie(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        !user && next(new ErrorResponse("No user with this email", 404));

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `${req.protocol}://${req.get(
            "host"
        )}/auth/resetpassword/${resetToken}`; //localhost:5000/resetpassword/resetToken fetch

        try {
            EmailCtrl.sendForgotPassword(user.username, email, resetURL);

            res.status(200).json({
                success: true,
                message: "Check Your Email for Password Reset Link",
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            next(error);
            console.log(error);
        }
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        !user && next(new ErrorResponse("Invalid Token", 400));

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(210).json({
            success: true,
            message: "Password Updated",
        });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logout Successfully",
        });
    } catch (error) {
        next(error);
    }
};

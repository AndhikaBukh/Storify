const User = require('../models/user.model')
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const session = require('express-session');
const sendCookie = require('../utils/sendCookie');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {


    try {
        const {
            avatar,
            name,
            username,
            email,
            password,
            confirmPassword,
        } = req.body;

        if (!username) {
            return next(new ErrorResponse('Please provide a username', 400));
        }

        if (!email) {
            return next(new ErrorResponse('Please provide an email', 400));
        }

        if (!password) {
            return next(new ErrorResponse('Please provide a password', 400));
        }

        if (!confirmPassword) return next(new ErrorResponse('Confirm Password is required', 400));
        if (password !== confirmPassword) return next(new ErrorResponse("Password doesn't match", 400));

        const user = await User.create({
            avatar,
            name,
            username,
            email,
            password,
        })

        sendCookie(user, 201, res);


    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};
exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Email or Password is wrong!', 400));
    }

    try {
        const user = await User.findOne({
            email
        }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Email or Password is wrong!', 400));
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse('Passowrd in Correct', 400));
        }

        sendCookie(user, 200, res);
    } catch (error) {
        next(error);
    }
};
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('No user with this email', 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`; //localhost:5000/resetpassword/resetToken fetch

        const message = `Forgot your password? Go to ${resetURL} to reset it.`;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset',
                text: message
            });

            res.status(200).json({
                success: true,
                message: 'Check Your Email for Password Reset Link'
            })

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
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        if (!user) {
            return next(new ErrorResponse('Invalid Reset Token', 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(210).json({
            success: true,
            message: 'Password Updated'
        })
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        next(error);
    }
}


const sendToken = (user, statusCode, res) => {
    const token = user.generateToken();
    res.status(statusCode).json({
        success: true,
        token,
    });
}
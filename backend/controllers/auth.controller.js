const User = require('../models/user.model')
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const session = require('express-session');

exports.register = async (req, res, next) => {
    const {
        name,
        username,
        email,
        password,
        gender
    } = req.body;

    try {
        const user = await User.create({
            name, username, email, password, gender
        })
        sendToken(user, 201, res);


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
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    try {
        const user = await User.findOne({
            email
        }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Please Provide a valid email', 400));
        }

        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse('Passowrd in Correct', 400));
        }
        req.session.user = 1;

        res.status(200).json({
            success: true,
            token: user.getSignedToken(),
        })

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
            res.status(200).json({
                success: true,
                message: message,
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
        req.session.destroy();
        res.status(200).json({
            success: true,
            message: 'Logout Successfully'
        })
    } catch (error) {
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token,
    });
}
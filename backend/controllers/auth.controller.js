const User = require('../models/user.model')
const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const sendCookie = require('../utils/sendCookie');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {


    try {
        const {
            name,
            username,
            email,
            password,
            confirmPassword,
        } = req.body;

        !username && next(new ErrorResponse('Please provide username', 400));

        username.length < 5 && next(new ErrorResponse('Username must be at least 5 characters', 400));

        !email && next(new ErrorResponse('Please provide a email', 400));
        !email.includes('@') && next(new ErrorResponse('Please provide a valid email', 400));

        !password && next(new ErrorResponse('Please provide a password', 400));

        !confirmPassword && next(new ErrorResponse('Please confirm your password', 400));

        if (password !== confirmPassword) {
            next(new ErrorResponse('Password and Confirm Password must be same', 400));
        } else {
            const user = await User.create({
                name,
                username,
                email,
                password,
            })

            sendCookie(user, 201, res);
        }

    } catch (error) {
        next(new ErrorResponse(error.message, 400));
    }
};
exports.login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    !email || !password && next(new ErrorResponse('Email or Password is wrong!', 400));

    !email.includes('@') && next(new ErrorResponse('Please provide a valid email', 400));

    try {
        const user = await User.findOne({
            email
        }).select('+password');

        !user && next(new ErrorResponse('Email or Password is wrong!', 400));

        const isMatch = await user.matchPasswords(password);
        !isMatch && next(new ErrorResponse('Password is wrong!', 400));

        sendCookie(user, 200, res);
    } catch (error) {
        next(error);
    }
};
exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        !user && next(new ErrorResponse('No user with this email', 404));

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

        !user && next(new ErrorResponse('Invalid Token', 400));

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
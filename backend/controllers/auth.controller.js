const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        const user = await User.create({
            username, email, password
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
            return next(new ErrorResponse("Invalid Credentials", 401));
        }

        sendToken(user, 200, res);
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

        const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

        const message = `Forgot your password? Go to ${resetURL} to reset it.`;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset',
                text: message
            });

            res.status(200).json({
                success: true,
                message: 'Token sent to email',
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

exports.resetPassword = (req, res, next) => {
    res.send("Forgot Password Route");
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        success: true,
        token
    });
}
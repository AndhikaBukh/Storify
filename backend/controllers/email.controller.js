const sendEmail = require('../utils/sendEmail');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user.model');

// view email
const ViewEmail = require('../utils/viewEmail');


exports.sendForgotPassword = async (username, email, resetUrl) => {
    try {
        await sendEmail({
            to: email,
            subject: 'Password Reset',
            html: ViewEmail.forgotPass(username, resetUrl)
        });
    }
    catch (err) {
        next(new ErrorResponse(err.message, 400));
    }
};

exports.verifyEmail = async (email, token) => {
    try {
        await sendEmail({
            to: email,
            subject: 'Verify Email',
            html: ViewEmail.verifyEmail(email, token)
        });
    }
    catch (err) {
        next(new ErrorResponse(err.message, 400));
    }
}

exports.generateOTP = () =>{
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 9);
    }

    return otp
}
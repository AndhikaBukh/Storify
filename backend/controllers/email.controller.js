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
    catch(err){
        next(new ErrorResponse(err.message, 400));
    }
}
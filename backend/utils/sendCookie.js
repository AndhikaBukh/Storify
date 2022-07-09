require('dotenv').config();

const sendCookie = (user = {}, statusCode, res) => {
    const token = user.generateToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        expires: options.expires,
        user,
    });
}

module.exports = sendCookie;

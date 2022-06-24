const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Set token to the Bearer token sent in the authorization header
        token = req.headers.authorization.split(' ')[1];
    }

    // If no token found, return response (without sending response)
    if (!token) {
        return next(new ErrorResponse('Not authorized', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and get data

        const user = await User.findById(decoded.id); // Find user by id

        if (!user) {
            return next(new ErrorResponse('No user found with this ID', 401));
        }

        req.user = user; // Add user to request object
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized', 401));
    }
}
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const ErrorResponse = require('../utils/errorResponse');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) return next(new ErrorResponse('Not authorized to access this route', 401));

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

module.exports = auth;
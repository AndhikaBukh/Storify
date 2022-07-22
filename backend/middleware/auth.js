const jwt = require("jsonwebtoken");
const Auth = require("../utils/Auth");

const User = require("../models/user.model");
const ErrorResponse = require("../utils/errorResponse");

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Bearer <token>
        const token = authHeader && authHeader.split(" ")[1];

        if (!token)
            return next(
                new ErrorResponse("Not authorized to access this route", 401)
            );

        // bearer
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and get data

        const user = await User.findById(decoded.id); // Find user by id

        if (!user.verified)
            return next(new ErrorResponse("Please verify your email", 401));

        if (!user) {
            return next(new ErrorResponse("No user found with this ID", 401));
        }

        // set user to Auth
        Auth.set(user);
        req.user = user; // Add user to request object
        next();
    } catch (error) {
        return next(new ErrorResponse("Not authorized", 401));
    }
};

module.exports = auth;

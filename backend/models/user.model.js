const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        maxlength: 25
    },
    username: {
        type: String,
        required: [true, "Please fill a Username"],
        unique: true,
        minlength: [3, "Username must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please fill a Email"],
        unique: true,
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Please fill a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please fill a Password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    },
    gender: { type: String, default: "male" },
    bio: {
        type: String,
        default: "",
        maxlength: [200, "Story must be at least 200 characters"]
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    // if useranme aleready exists
    const user_name = await User.findOne({ username: this.username });
    if (user_name) {
        throw new Error("Username already exists");
    }

    const user_email = await User.findOne({ email: this.email });
    if (user_email) {
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto
        .randomBytes(20)
        .toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

    return resetToken;
}

// destroy token when user logs out
UserSchema.methods.removeTokenLogout = function () {
    this.tokens = this.tokens.filter(token => {
        return token.token !== this.token;
    }
    );
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
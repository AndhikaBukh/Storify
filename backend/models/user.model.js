const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxlength: 30,
            default: "",
        },
        username: {
            type: String,
            required: [true, "Please fill a Username"],
            unique: [true, "udah ada"],
            minlength: [5, "Username must be at least 5 characters"],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Please fill a Email"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Please fill a valid email",
            ],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please fill a Password"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        avatar: {
            type: String,
            default:
                "https://res.cloudinary.com/dhpbjwguo/image/upload/v1657199909/avatar/default_wmkdzz.png",
        },
        banner: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
            maxlength: [200, "Story must be at least 200 characters"],
        },
        gender: { type: String, default: "male" },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        post: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],

        story: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Story",
            },
        ],

        saved: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.verifyEmail = async function (req, res) {};

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

    return resetToken;
};

// destroy token when user logs out
UserSchema.methods.removeTokenLogout = function () {
    this.tokens = this.tokens.filter((token) => {
        return token.token !== this.token;
    });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

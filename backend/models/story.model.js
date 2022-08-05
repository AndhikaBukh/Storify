const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
    {
        story: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        expiresAt: {
            type: Date,
            default: Date.now,
            expires: 60 * 60 * 24,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);

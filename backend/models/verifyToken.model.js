const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 },
});

tokenSchema.pre("save", async function (next) {
    if (!this.isModified("token")) {
        const hash = await bcrypt.hash(this.token, 8);
        this.token = hash;
    }
    next();
})

tokenSchema.methods.compareToken = async (token) => {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}


module.exports = mongoose.model("VerifyToken", tokenSchema);
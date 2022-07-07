const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    tag: Object,
    reply: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
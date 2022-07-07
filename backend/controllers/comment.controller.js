const Comments = require('../models/comment.model');
const Post = require('../models/post.model');

const commentCtrl = {
    createComment: async (req, res) => {
        try {
            const { postId, comment, tag, reply, postUserId } = req.body

            const post = await Post.findById(postId)
            if (!post) return res.status(400).json({ message: "This post does not exist." })

            if (reply) {
                const comment = await Comments.findById(reply)
                if (!comment) return res.status(400).json({ message: "This comment does not exist." })
            }

            const newComment = new Comments({
                user: req.user._id, comment, tag, reply, postUserId, postId
            })

            await Post.findOneAndUpdate({ _id: postId }, {
                $push: { comments: newComment._id }
            }, { new: true })

            await newComment.save()

            res.json({ newComment })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    updateComment: async (req, res) => {
        try {
            const { comment } = req.body;

            await Comments.findOneAndUpdate({
                _id: req.params.id, user: req.user.id
            }, { comment });

            res.json({ msg: "Update Comment Success!" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    likeComment: async (req, res) => {
        try {
            const comment = await Comments.find({ _id: req.params.id, likes: req.user._id })
            if (comment.length > 0) return res.status(400).json({ msg: "You liked this comment." })

            await Comments.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req.user.id }
            }, { new: true })

            res.json({ message: "Like Comment Succes!" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    unlikeComment: async (req, res) => {
        try {

            await Comments.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user.id }
            }, { new: true })

            res.json({ message: "Unlike Comment Succes!" })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },

    deleteComment: async (req, res) => {
        try {
            const comment = await Comments.findOneAndDelete({
                _id: req.params.id,
                $or: [
                    { user: req.user._id },
                    { postId: req.user._id }
                ]
            })

            await Post.findOneAndUpdate({ _id: comment.postId }, {
                $pull: { comments: req.params.id }
            })

            res.json({ message: "Delete Comment Succes!" })

        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

module.exports = commentCtrl;
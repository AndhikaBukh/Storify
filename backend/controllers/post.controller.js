const Post = require('../models/post.model');
const User = require('../models/user.model');

const cloudinary = require("../config/cloudinary");
const upload = require("../utils/multer");

const postController = {
    createPost: async (req, res) => {
        try {
            const { images, caption } = req.body;

            // const result = await cloudinary.uploader.upload(req.file.path, {
            //     folder: "post",
            //     width: 1080,
            //     height: 1080,
            // })

            const post = new Post({
                images: images,
                caption,
                author: req.user._id,
            })

            await post.save()

            res.status(200).json({
                message: 'Post created successfully',
                post
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getPost: async (req, res) => {
        try {
            const post = await Post.find({
                user: [...req.user.following, req.user._id]
            }).sort({ createdAt: -1 })
                .populate('user likes', 'avatar username')

            res.status(200).json({
                message: 'Success get post!',
                post: post.reverse()
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body

            const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
                content, images
            }).populate("user likes", "avatar username name")
                .populate({
                    path: "comments",
                    populate: {
                        path: "user likes",
                        select: "-password"
                    }
                })

            res.status(200).json({
                message: 'Post updated successfully',
                newPost: {
                    ...post._doc,
                    caption, images
                }
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);

            await cloudinary.uploader.destroy(post.images);

            await post.remove();

            res.status(200).json({
                message: 'Post deleted successfully',
                post
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    likePost: async (req, res) => {
        try {
            const post = await Post.find({ _id: req.params.id, likes: req.user._id })
            if (post.length > 0) return res.status(400).json({ msg: "You liked this post." })

            const like = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $push: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(404).json({ message: "Post not found" })

            res.status(200).json({
                message: 'Post liked successfully'
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    unlikePost: async (req, res) => {
        try {
            const like = await Post.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { likes: req.user._id }
            }, { new: true })

            if (!like) return res.status(400).json({ message: "Post not found" })

            res.status(200).json({
                message: 'Post unliked successfully'
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getPostOfFollowing: async (req, res) => {
        try {
            const user = await User.findById(req.user._id).populate('following', 'avatar username')

            const currentPage = req.query.page || 1;

            const skipPosts = (currentPage - 1);

            const totalPosts = await Post.find({
                author: { $in: user.following }
            }).countDocuments();

            const posts = await Post.find({
                author: {
                    $in: user.following
                }
            }).populate("author likes").populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            }).sort({ createdAt: -1 }).limit(4).skip(skipPosts)


            return res.status(200).json({
                success: true,
                posts: posts,
                totalPosts
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },


};

module.exports = postController;
const User = require('../models/user.model');

const userController = {

    searchUser: async (req, res) => {
        try {
            const users = await User.find({
                username: {
                    $regex: `^${req.query.username}`,
                }
            }).limit(10).select('username avatar name');
            res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password')
                .populate('followers following', '-password');

            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { avatar, name, bio, gender } = req.body;

            await User.findOneAndUpdate({
                avatar, name, bio, gender
            })

            res.json({ message: "Update Succes!" })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    followUser: async (req, res) => {
        try {

            const user = await User.find({ _id: req.params.id, followers: req.user._id })
            if (user.length > 0) return res.status(500).json({ messag: "You followed this user." })

            const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await User.findOneAndUpdate({ _id: req.user._id }, {
                $push: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    },

    unfollowUser: async (req, res) => {
        try {
            const newUser = await User.findOneAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.user._id }
            }, { new: true }).populate("followers following", "-password")

            await User.findOneAndUpdate({ _id: req.user._id }, {
                $pull: { following: req.params.id }
            }, { new: true })

            res.json({ newUser })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }
};

module.exports = userController;
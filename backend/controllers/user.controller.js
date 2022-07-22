const User = require("../models/user.model");
const Auth = require("../utils/Auth");

const cloudinary = require("../config/cloudinary");
const upload = require("../utils/multer");

const sendCookie = require("../utils/sendCookie");

const userController = {
    updateUser: async (req, res) => {
        try {
            const user = Auth.user;

            const { name, username, bio, gender } = req.body;

            // Edit Avatar
            if (req.files?.avatar) {
                await cloudinary.uploader.destroy(
                    `avatar/${user.email.split("@")[0]}`,
                    user.avatar
                );

                const resultAvatar = await cloudinary.uploader.upload(
                    req.files.avatar[0].path,
                    {
                        width: 300,
                        folder: "sylly",
                        crop: "fill",
                        public_id: `avatar/${user.email.split("@")[0]}`,
                        secure_url: true,
                    }
                );

                await Auth.update({
                    avatar: resultAvatar.secure_url,
                });
            }

            // Edit Banner
            if (req.files?.banner) {
                await cloudinary.uploader.destroy(
                    `banner/${user.email.split("@")[0]}`,
                    user.banner
                );

                const resultBanner = await cloudinary.uploader.upload(
                    req.files.banner[0].path,
                    {
                        width: 1500,
                        heigth: 800,
                        folder: "sylly",
                        crop: "fill",
                        public_id: `banner/${user.email.split("@")[0]}`,
                        secure_url: true,
                    }
                );

                await Auth.update({
                    banner: resultBanner.secure_url,
                });
            }

            await Auth.update({
                name,
                username,
                bio,
                gender,
            });

            Auth.save();

            res.json({
                message: "Update Succes!",
                UpdateData: Auth.user,
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },

    searchUser: async (req, res) => {
        try {
            const users = await User.find({
                username: {
                    $regex: `^${req.query.username}`,
                },
            }).select("username avatar name");
            res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },

    getMe: async (req, res) => {
        try {
            const user = await Auth.user.populate({
                path: "post",
                populate: {
                    path: "author",
                },
            });

            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    getUserDetail: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.params.username.toLowerCase(),
            })
                .populate("followers following")
                .populate({
                    path: "post",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                        },
                    },
                })
                .populate({
                    path: "post",
                    populate: {
                        path: "author",
                    },
                })
                .populate({
                    path: "saved",
                    populate: {
                        path: "comments",
                        populate: {
                            path: "user",
                        },
                    },
                })
                .populate({
                    path: "saved",
                    populate: {
                        path: "author",
                    },
                });

            if (user == null) {
                return res.status(404).json({
                    success: false,
                    error: "User not found!",
                });
            }

            const checkFllwr = user.followers.find((follower) => {
                if (follower.username == Auth.user.username) {
                    return follower;
                }
            });

            return res.status(200).json({
                success: true,
                user: user,
                isFollowed: checkFllwr ? true : false,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    followUser: async (req, res) => {
        try {
            const user = await User.find({
                _id: req.params.id,
                followers: req.user._id,
            });
            if (user.length > 0)
                return res
                    .status(400)
                    .json({ message: "You followed this user." });

            const newUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: { followers: req.user._id },
                },
                { new: true }
            ).populate("followers following", "-password");

            await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: { following: req.params.id },
                },
                { new: true }
            );

            res.json({
                message: "Followed successfully",
                newUser,
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },

    unfollowUser: async (req, res) => {
        try {
            const newUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { followers: req.user._id },
                },
                { new: true }
            ).populate("followers following", "-password");

            await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: { following: req.params.id },
                },
                { new: true }
            );

            res.json({
                message: "Unfollowed successfully",
                newUser,
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },

    sugestUser: async (req, res) => {
        try {
            const users = await User.find(req.params._id);

            const suggestedUsers = users
                .filter(
                    (u) =>
                        !u.followers.includes(req.user._id) &&
                        u._id.toString() !== req.user._id.toString()
                )
                .slice(-10);

            res.json({
                Users: suggestedUsers,
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    },
};

module.exports = userController;

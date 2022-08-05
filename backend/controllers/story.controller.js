const errorResponse = require("../utils/errorResponse");
const Story = require("../models/story.model");
const User = require("../models/user.model");

const cloudinary = require("../config/cloudinary");
const upload = require("../utils/multer");

exports.createStory = async (req, res) => {
    try {
        const token =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "sylly",
            public_id: `story/${token}`,
            secure_url: true,
            quality: 60,
            format: "jpg",
            height: 1280,
            width: 720,
        });

        const story = new Story({
            story: result.secure_url,
            author: req.user._id,
        });

        await User.findByIdAndUpdate(
            { _id: req.user._id },
            {
                $push: {
                    story: story._id,
                },
            }
        );

        await story.save();

        await setTimeout(() => {
            cloudinary.uploader.destroy(
                `sylly/story/${story.story.split("/")[9].split(".")[0]}`,
                story.story
            );

            User.findByIdAndUpdate(
                { _id: req.user._id },
                {
                    $pull: {
                        story: story._id,
                    },
                }
            );

            console.log("Story expired");
        }, 86400000);

        res.status(200).json({
            message: "Story created successfully",
            story,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.deleteStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) return res.status(500).json({ message: "Story not found" });

        await cloudinary.uploader.destroy(
            `sylly/story/${story.story.split("/")[9].split(".")[0]}`,
            story.story
        );

        story.remove();

        await User.findByIdAndUpdate(
            { _id: req.user._id },
            {
                $pull: {
                    story: story._id,
                },
            }
        );

        res.status(200).json({
            message: "Story deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getStory = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) return res.status(500).json({ message: "Story not found" });

        res.status(200).json({
            message: "Story found successfully",
            story,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

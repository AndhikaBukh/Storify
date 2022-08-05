const router = require("express").Router();
const auth = require("../middleware/auth");
const storyCtrl = require("../controllers/story.controller");

const upload = require("../utils/multer");

router // http://localhost:3000/api/story
    .route("/story")
    .post(auth, upload.single("story"), storyCtrl.createStory);

router // http://localhost:3000/api/story/:id
    .route("/story/:id")
    .get(storyCtrl.getStory)
    .delete(auth, storyCtrl.deleteStory);

module.exports = router;

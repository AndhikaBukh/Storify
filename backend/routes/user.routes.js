const router = require("express").Router();
const auth = require("../middleware/auth");
const userCtrl = require("../controllers/user.controller");

const upload = require("../utils/multer");

router
    .route("/me") // http://localhost:3000/api/me
    .get(auth, userCtrl.getMe) // get user
    .put(
        auth,
        upload.fields([
            {
                name: "avatar",
                maxCount: 1,
            },
            {
                name: "banner",
                maxCount: 1,
            },
        ]),
        userCtrl.updateUser
    ); // update user

router.get("/search", userCtrl.searchUser); // search user // http://localhost:3000/api/search

router.post("/user/:username", userCtrl.getUserDetail); // deatil user by username // http://localhost:3000/api/user/:username

// get user Detai by id
router.get("/user/:id/detail", userCtrl.getUserDetail); // http://localhost:3000/api/user/:id/detail

router.put("/user/:id/follow", auth, userCtrl.followUser); // follow user // http://localhost:3000/api/user/:id/follow
router.put("/user/:id/unfollow", auth, userCtrl.unfollowUser); // unfollow user // http://localhost:3000/api/user/:id/unfollow

router.route("/users/suggested").get(auth, userCtrl.sugestUser); // get suggested user // http://localhost:3000/api/users/suggested

module.exports = router;

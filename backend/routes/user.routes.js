const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user.controller');

const upload = require('../utils/multer');


router.get('/user/:id', auth, userCtrl.getUser); // get user // http://localhost:3000/api/user/:id

router.route('/me') // http://localhost:3000/api/me
    .get(auth, userCtrl.getMe) // get user
    .put(auth,
        upload.single('image'),
        userCtrl.updateUser,
    ); // update user


router.get('/search', auth, userCtrl.searchUser); // search user // http://localhost:3000/api/search

router.get('/user/:username', auth, userCtrl.getUserDetail); // deatil user by username // http://localhost:3000/api/user/:username

// get user Detai by id
router.get('/user/:id/detail', auth, userCtrl.getUserDetail); // http://localhost:3000/api/user/:id/detail

router.put('/user/:id/follow', auth, userCtrl.followUser); // follow user // http://localhost:3000/api/user/:id/follow
router.put('/user/:id/unfollow', auth, userCtrl.unfollowUser); // unfollow user // http://localhost:3000/api/user/:id/unfollow

router.route("/users/suggested").get(auth, userCtrl.sugestUser); // get suggested user // http://localhost:3000/api/users/suggested

router.put('/update/password', auth, userCtrl.updatePassword); // update password // http://localhost:3000/api/update/password

module.exports = router; 
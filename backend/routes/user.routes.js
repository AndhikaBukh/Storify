const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user.controller');

const upload = require('../utils/multer');

router.get('/user/search', auth, userCtrl.searchUser); // search user // http://localhost:3000/api/user/search

router.get('/user/:id', auth, userCtrl.getUser); // get user // http://localhost:3000/api/user/:id

router.put('/user',// http://localhost:3000/api/user
    auth,
    upload.single('image'),
    userCtrl.updateUser,
); // update user 

router.put('/user/:id/follow', auth, userCtrl.followUser); // follow user // http://localhost:3000/api/user/:id/follow
router.put('/user/:id/unfollow', auth, userCtrl.unfollowUser); // unfollow user // http://localhost:3000/api/user/:id/unfollow

router.route("/users/suggested").get(auth, userCtrl.sugestUser); // get suggested user // http://localhost:3000/api/users/suggested


module.exports = router; 
const router = require('express').Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user.controller');

router.get('/search', auth, userCtrl.searchUser);

router.get('/user/:id', auth, userCtrl.getUser);

router.put('/user', auth, userCtrl.updateUser);

router.put('/user/:id/follow', auth, userCtrl.followUser);
router.put('/user/:id/unfollow', auth, userCtrl.unfollowUser);

module.exports = router; 
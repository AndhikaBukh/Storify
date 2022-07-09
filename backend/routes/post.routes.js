const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
const auth = require('../middleware/auth');

const upload = require('../utils/multer');

router.route('/post') // http://localhost:3000/api/post
    .post(auth, upload.single('image'), postCtrl.createPost) // create a post
    .get(auth, postCtrl.getAllPost); // get all post

router.route('/post/:id') // http://localhost:3000/api/post/:id
    .get(auth, postCtrl.getPostDetail) // get a post by id
    .post(auth, postCtrl.saveUnsavePost) // save or unsave a post
    .put(auth, postCtrl.updatePost) // update a post
    .delete(auth, postCtrl.deletePost); // delete a post

router.route('/post/:id/like') // http://localhost:3000/api/post/:id/like
    .put(auth, postCtrl.likePost); // like a post

router.route('/post/:id/unlike') // http://localhost:3000/api/post/:id/unlike
    .put(auth, postCtrl.unlikePost); // unlike a post

router.route('/post/following') // http://localhost:3000/api/post/following
    .get(auth, postCtrl.getPostOfFollowing); // get all post of following

module.exports = router;
const router = require('express').Router();
const commentCtrl = require('../controllers/comment.controller');
const auth = require('../middleware/auth');

router.post('/comment', auth, commentCtrl.createComment); // create a comment // http://localhost:3000/api/comment

router.route('/comment/:id') // http://localhost:3000/api/comment/:id
    .put(auth, commentCtrl.updateComment) // update a comment
    .delete(auth, commentCtrl.deleteComment); // delete a comment

router.put('/comment/:id/like', auth, commentCtrl.likeComment); // like a comment // http://localhost:3000/api/comment/:id/like

router.put('/comment/:id/unlike', auth, commentCtrl.unlikeComment); // unlike a comment // http://localhost:3000/api/comment/:id/unlike


module.exports = router;
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');
const PostValidator = require('../middlewares/post.validation');
const verifyToken = require('../middlewares/auth.middleware');

router.post(
  '/',
  PostValidator.validateData(),
  PostValidator.ValidationResult,
  verifyToken,
  PostController.createPost
);

router.put(
  '/:postId',
  PostValidator.validateData(),
  PostValidator.ValidationResult,
  verifyToken,
  PostController.updatePost
);
router.delete('/:postId', verifyToken, PostController.deletePost);

router.get('/', PostController.getPosts);
router.get('/:postId', verifyToken, PostController.getPost);
router.post('/:postId/comment', verifyToken, PostController.addComment);
router.delete(
  '/:postId/comment/:commentId',
  verifyToken,
  PostController.deleteComment
);

router.post('/:postId/like', verifyToken, PostController.likePost);
router.delete('/:postId/unlike', verifyToken, PostController.unlikePost);

module.exports = router;

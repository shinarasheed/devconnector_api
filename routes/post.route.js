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

router.get('/', PostController.getPosts);
router.get('/:postId', PostController.getPost);

module.exports = router;

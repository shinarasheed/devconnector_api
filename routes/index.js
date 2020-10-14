const express = require('express');
const authRouter = require('./auth.route');
const postRouter = require('./post.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);

module.exports = router;

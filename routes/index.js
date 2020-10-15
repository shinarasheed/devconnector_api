const express = require('express');
const authRouter = require('./auth.route');
const postRouter = require('./post.route');
const profileRouter = require('./profile.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/profile', profileRouter);

module.exports = router;

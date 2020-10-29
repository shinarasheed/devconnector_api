const Post = require('../model/post.model');
const User = require('../model/user.model');
/**
 *Contains Auth Controller
 *
 * @class PostController
 */
class PostController {
  /* eslint camelcase: 0 */

  /**
   * Create post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async createPost(req, res) {
    const { text } = req.body;
    try {
      //find the user
      const user = await User.findOne({ _id: req.user });

      //setup post
      //we can decide to remove the username and avatar and still be able to get them
      const post = new Post({
        user: req.user,
        name: user.name,
        avatar: user.avatar,
        text,
      });

      const newPost = await post.save();

      res.status(201).json({ status: 'success', data: newPost });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async updatePost(req, res) {
    try {
      let post = await Post.findById(req.params.postId);
      if (!post) {
        return res
          .status(404)
          .json({ status: 'error', message: 'post not found' });
      }

      //check owner
      if (post.user.toString() !== req.user) {
        return res
          .status(403)
          .json({ status: 'error', message: 'permission denield' });
      }

      let newpost = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        req.body,
        {
          new: true,
        }
      );

      res.status(201).json({ status: 'success', message: 'post updated' });
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'post not found' });
      }
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Delete Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async deletePost(req, res) {
    try {
      await Post.findOneAndRemove({ _id: req.params.postId });
      res.status(200).json({ status: 'success', message: 'post deleted' });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Get Single Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.postId);

      const user = await User.findById(req.user);

      const view = {
        user: req.user,
        name: user.name,
      };

      post.views.unshift(view);
      await post.save();
      res.status(200).json({ status: 'success', data: post });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Get all Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async getPosts(req, res) {
    try {
      const posts = await Post.find().sort({ date: -1 });
      res
        .status(200)
        .json({ status: 'success', count: posts.length, data: posts });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * comment on a Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async addComment(req, res) {
    try {
      let post = await Post.findById(req.params.postId);
      if (!post) {
        res.status(404).json({ status: 'error', message: 'post not found' });
      }
      const user = await User.findOne({ _id: req.user });

      ///setup comment
      const { text } = req.body;
      const newComment = {
        user: req.user,
        name: user.name,
        avatar: user.avatar,
        text,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.status(201).json({
        status: 'success',
        count: post.comments.length,
        data: post.comments,
      });
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'post not found' });
      }
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Delete Comment from Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async deleteComment(req, res) {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res
          .status(404)
          .json({ status: 'error', message: 'post nor found' });
      }

      const comment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );
      if (!comment) {
        return res
          .status(404)
          .json({ status: 'error', message: 'comment not found' });
      }

      if (comment.user.toString() !== req.user) {
        return res
          .status(403)
          .json({ status: 'error', message: 'permission denied' });
      }

      const comments = post.comments;
      //get comments index array
      const commentsIndexArray = comments.map((comment) => comment._id);
      //get index of comment to remove
      const index = commentsIndexArray.indexOf(req.params.commentId);
      comments.splice(index, 1);
      await post.save();
      res.status(200).json({ status: 'success', message: 'comment deleted' });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   *Like a Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async likePost(req, res) {
    try {
      let post = await Post.findById(req.params.postId);
      if (!post) {
        res.status(404).json({ status: 'error', message: 'post not found' });
      }

      const like = {
        user: req.user,
      };

      const likeExist = post.likes.find(
        (like) => like.user.toString() === req.user
      );

      if (likeExist) {
        return res
          .status(403)
          .json({ status: 'error', message: 'you already liked this post' });
      }

      post.likes.unshift(like);
      await post.save();
      res.status(201).json({
        status: 'success',
        count: post.likes.length,
        data: post.likes,
      });
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'post not found' });
      }
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   *UnLike a Post.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async unlikePost(req, res) {
    try {
      let post = await Post.findById(req.params.postId);
      if (!post) {
        res.status(404).json({ status: 'error', message: 'post not found' });
      }

      //check if post has not been liked
      if (
        post.likes.filter((like) => like.user.toString() === req.user)
          .length === 0
      ) {
        return res
          .status(403)
          .json({ status: 'error', message: 'post has not been liked by you' });
      }

      const likes = post.likes;
      //get comments index array
      const likesIndexArray = likes.map((like) => like.user);
      //get index of like to remove
      const index = likesIndexArray.indexOf(req.user);
      likes.splice(index, 1);
      await post.save();
      res.status(200).json({ status: 'success', data: post });
    } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'post not found' });
      }
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }
}

module.exports = PostController;

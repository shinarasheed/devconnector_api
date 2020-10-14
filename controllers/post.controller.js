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
    try {
      const { text } = req.body;

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
      const Post = await Post.findOne({ _id: req.Post }).select('-password');
      res.status(200).json({ status: 'success', data: Post });
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
      const posts = await Post.find();
      res
        .status(200)
        .json({ status: 'success', count: posts.length, data: posts });
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
      res.status(200).json({ status: 'success', data: post });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }
}

module.exports = PostController;

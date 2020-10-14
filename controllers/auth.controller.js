const User = require('../model/user.model');
const gravtar = require('gravatar');
/**
 *Contains Auth Controller
 *
 * @class AuthController
 */
class AuthController {
  /* eslint camelcase: 0 */

  /**
   * Create profile Auth.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(409)
          .json({ status: 'error', error: 'email already exist' });
      }

      const avatar = gravtar.url(email, {
        s: '200',
        r: 'pg',
        d: 'profileimg',
      });

      user = await User.create({
        name,
        email,
        password,
        avatar,
      });

      const token = user.generateAuthToken();
      res.status(201).json({ status: 'success', token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ status: 'error', error: 'invalid credentials' });
      }

      //compare passwpords
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: 'error', error: 'invalid credentials' });
      }

      const token = user.generateAuthToken();
      res.status(201).json({ status: 'success', token });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Get AUthenticated User.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async getAuthUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user }).select('-password');
      res.status(200).json({ status: 'success', data: user });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }
}

module.exports = AuthController;

const { check, validationResult } = require('express-validator');

/**
 *Contains Post Validator
 *
 *
 *
 * @class Post
 */
class PostValidator {
  /**
   * validate Post data.
   * @memberof Post
   * @returns {null} - No response.
   */
  static validateData() {
    return [check('text').not().isEmpty().withMessage('text is required')];
  }

  /**
   * Validation results.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Response} next - The next parameter.
   * @memberof SignUp
   * @returns {JSON} - A JSON success response.
   */
  static async ValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errArr = errors.array().map(({ msg }) => msg);
      return res.status(400).json({
        status: '400 Invalid Request',
        errors: errArr,
      });
    }
    return next();
  }
}

module.exports = PostValidator;

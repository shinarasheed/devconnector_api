const { check, validationResult } = require('express-validator');

/**
 *Contains Profile Validator
 *
 *
 *
 * @class Profile
 */
class ProfileValidator {
  /**
   * validate Profile data.
   * @memberof Profile
   * @returns {null} - No response.
   */
  static validateData() {
    return [
      check('status').not().isEmpty().withMessage('status is required'),
      check('skills').not().isEmpty().withMessage('skills is required'),
    ];
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

module.exports = ProfileValidator;

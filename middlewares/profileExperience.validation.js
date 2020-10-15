const { check, validationResult } = require('express-validator');

/**
 *Contains Profile Experience Validator
 *
 *
 *
 * @class Profile Experience
 */
class ProfileExperienceValidator {
  /**
   * validate Profile Experience data.
   * @memberof Profile Experience
   * @returns {null} - No response.
   */
  static validateData() {
    return [
      check('title').not().isEmpty().withMessage('title is required'),
      check('company').not().isEmpty().withMessage('company is required'),
      check('location').not().isEmpty().withMessage('location is required'),
      check('from').not().isEmpty().withMessage('from date is required'),
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

module.exports = ProfileExperienceValidator;

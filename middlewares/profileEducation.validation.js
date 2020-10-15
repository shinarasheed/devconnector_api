const { check, validationResult } = require('express-validator');

/**
 *Contains Profile Education Validator
 *
 *
 *
 * @class Profile Education
 */
class ProfileEducationValidator {
  /**
   * validate Profile Education data.
   * @memberof Profile Education
   * @returns {null} - No response.
   */
  static validateData() {
    return [
      check('school').not().isEmpty().withMessage('school is required'),
      check('degree').not().isEmpty().withMessage('degree is required'),
      check('fieldofstudy')
        .not()
        .isEmpty()
        .withMessage('fieldofstudy is required'),
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

module.exports = ProfileEducationValidator;

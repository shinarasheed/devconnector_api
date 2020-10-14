const { check, validationResult } = require('express-validator');

/**
 *Contains Auth Validator
 *
 *
 *
 * @class Auth
 */
class AuthValidator {
  /**
   * validate Auth data.
   * @memberof Auth
   * @returns {null} - No response.
   */
  static validateData() {
    return [
      check('name').not().isEmpty().withMessage('name is required'),
      check('email')
        .not()
        .isEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('enter a valid email address'),
      check('password').not().isEmpty().withMessage('password is required'),
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

module.exports = AuthValidator;

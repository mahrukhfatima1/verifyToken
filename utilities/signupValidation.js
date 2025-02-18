let { body } = require('express-validator');

module.exports = validateUser = () => {
    return  [
        body('username')
        .trim()
        .isString().withMessage('username must be a string')
        .notEmpty().withMessage('username is required!')
        .isLength({min: 3}).withMessage('Username must be at least 3 characters long')
        .isLength({max: 20}).withMessage('Username must be at most 20 characters long'),
        body('firstName')
        .trim()
        .isString().withMessage('firstName must be a string')
        .notEmpty().withMessage('firstName is required!')
        .isAlpha().withMessage('First name must only contain letters')
        .isLength({min: 3}).withMessage('firstName must be at least 3 characters long')
        .isLength({max: 20}).withMessage('firstName must be at most 20 characters long'),
        body('lastName')
        .trim()
        .isString().withMessage('lastName must be a string')
        .notEmpty().withMessage('lastName is required!')
        .isAlpha().withMessage('Last name must only contain letters')
        .isLength({min: 3}).withMessage('lastName must be at least 3 characters long')
        .isLength({max: 20}).withMessage('lastName must be at most 20 characters long'),
        body('email')
        .trim()
        .isString().withMessage('email must be a string')
        .notEmpty().withMessage('email is required!')
        .isEmail().withMessage('email must be a valid email'),
        body('password')
        .trim()
        .isString().withMessage('password must be a string')
        .notEmpty().withMessage('password is required!')
        .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }).withMessage('password must be at least 8 characters long with at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'),
        body('age')
        .trim()
        .isNumeric().withMessage('age must be a number')
        .notEmpty().withMessage('age is required!')
        .isInt({min: 1}).withMessage('age must be a positive number')
        .isInt({max: 100}).withMessage('age must be less than 100')
      
      ]
} 
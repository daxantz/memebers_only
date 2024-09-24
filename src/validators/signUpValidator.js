const { body } = require("express-validator");

const validateUser = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("first name is required")
    .isAlpha()
    .withMessage("this field only allows characters a-z"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("last name is required")
    .isAlpha()
    .withMessage("this field only allows characters a-z"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 8 and 16 characters"),
  body("confirm_password")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("both passwords must match"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("must be a valid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 8 and 16 characters"),
];

module.exports = {
  validateUser,
  loginValidation,
};

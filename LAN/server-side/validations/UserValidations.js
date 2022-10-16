const { body } = require("express-validator");
const LoginValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Email is not valid")
    .trim(),
  body("password").not().isEmpty().withMessage("Password is empty"),
];
const SignupValidation = [
  body("username")
    .not()
    .isEmpty()
    .withMessage(`Username can't be empty`)
    .trim(),
  body("email")
    .not()
    .isEmpty()
    .withMessage(`Email can't be empty`)
    .isEmail()
    .withMessage("Email is not valid")
    .trim(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be more than 5"),
];
module.exports = { LoginValidation, SignupValidation };

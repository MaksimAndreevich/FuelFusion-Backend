import { body } from "express-validator";

export const loginValidation = [
  body("email").isEmail().withMessage("Invalid e-mail"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 chars long"),
];

export const registerValidation = [
  body("email").isEmail().withMessage("Invalid e-mail"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 chars long"),
  body("fullName").isLength({ min: 3 }).withMessage("Full name must be at least 3 chars long"),
];

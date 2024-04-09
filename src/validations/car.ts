import { body } from "express-validator";

export const carCreateValidation = [
  body("name").isLength({ min: 3 }).withMessage("Name name must be at least 3 chars long"),
  body("year").isLength({ min: 4 }).withMessage("Year must be at least 4 chars long"),
  body("mileage").isLength({ min: 3 }).withMessage("Full name must be at least 3 chars long"),
];

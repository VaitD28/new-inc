import { body } from "express-validator";
export const videoPostValidation = [
  body("title")
    .isString()
    .withMessage("Incorrect title! Title must be a string")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Incorrect title! Title length should be [1, 40]"),

  body("author")
    .isString()
    .withMessage("Incorrect author! Author must be a string")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Incorrect author! Author length should be [1, 20]"),
];
export const videoPutValidation = [
  body("title")
    .isString()
    .withMessage("Incorrect title! Title must be a string")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("Incorrect title! Title length should be [1, 40]"),

  body("author")
    .isString()
    .withMessage("Incorrect author! Author must be a string")
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage("Incorrect author! Author length should be [1, 20]"),
];

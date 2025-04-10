"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoPutValidation = exports.videoPostValidation = void 0;
const express_validator_1 = require("express-validator");
exports.videoPostValidation = [
    (0, express_validator_1.body)("title")
        .isString()
        .withMessage("Incorrect title! Title must be a string")
        .trim()
        .isLength({ min: 1, max: 40 })
        .withMessage("Incorrect title! Title length should be [1, 40]"),
    (0, express_validator_1.body)("author")
        .isString()
        .withMessage("Incorrect author! Author must be a string")
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage("Incorrect author! Author length should be [1, 20]"),
];
exports.videoPutValidation = [
    (0, express_validator_1.body)("title")
        .isString()
        .withMessage("Incorrect title! Title must be a string")
        .trim()
        .isLength({ min: 1, max: 40 })
        .withMessage("Incorrect title! Title length should be [1, 40]"),
    (0, express_validator_1.body)("author")
        .isString()
        .withMessage("Incorrect author! Author must be a string")
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage("Incorrect author! Author length should be [1, 20]"),
];

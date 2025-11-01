const { body, validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

/**
 * 🧾 Validator for user registration
 */
export const registerValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
    .isLength({ max: 30 }).withMessage("Username must not exceed 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores")
    .trim(),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .isLength({ max: 100 }).withMessage("Password must not exceed 100 characters")
    .custom((value: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!passwordRegex.test(value)) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
      return true;
    }),

  body("confirmPassword")
    .custom((value: string, { req }: { req: any }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Role must be either 'admin' or 'user'"),

  body("socialLinks.website")
    .optional()
    .isURL()
    .withMessage("Website must be a valid URL"),

  body("socialLinks.facebook")
    .optional()
    .isURL()
    .withMessage("Facebook must be a valid URL"),

  body("socialLinks.instagram")
    .optional()
    .isURL()
    .withMessage("Instagram must be a valid URL"),
];

/**
 * 🔐 Validator for user login
 */
export const loginValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

/**
 * ✅ Middleware to handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }
  next();
};
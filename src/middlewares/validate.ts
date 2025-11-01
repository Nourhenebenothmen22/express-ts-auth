import { body } from "express-validator";

/**
 * 🧾 Validator for user registration
 */
export const registerValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
    .custom((value) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!passwordRegex.test(value)) {
        throw new Error(
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
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
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];


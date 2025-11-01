import { body } from "express-validator";

export const registerValidator = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  body("avatar")
    .optional()
    .custom((value) => {
      const allowedExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
      const lowerValue = value.toLowerCase();
      const isValid = allowedExtensions.some((ext) => lowerValue.endsWith(ext));

      if (!isValid) {
        throw new Error("Avatar must be a valid image file (.png, .jpg, .jpeg, .gif, .webp)");
      }
      return true;
    }),
];

export const loginValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];

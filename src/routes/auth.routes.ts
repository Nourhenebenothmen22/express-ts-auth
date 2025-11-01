import express from "express";
import { registerValidator, loginValidator} from "../middlewares/validate";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller";

const router = express.Router();

/**
 * 🧾 Register route
 * POST /api/auth/register
 */
router.post("/register", registerValidator, registerUser);

/**
 * 🔐 Login route
 * POST /api/auth/login
 */
router.post("/login", loginValidator, loginUser);

/**
 * 🚪 Logout route
 * POST /api/auth/logout
 */
router.post("/logout", logoutUser);

export default router;

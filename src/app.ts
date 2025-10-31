import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// ===== Middlewares de Sécurité =====
app.use(helmet());
app.use(cors({ 
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true 
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===== Logging =====
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { 
    error: "⏳ Too many requests from this IP, please try again later." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ===== Health Check Route =====
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ 
    success: true,
    message: "🚀 Express + TypeScript + MongoDB + Auth API is running!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});



export default app;
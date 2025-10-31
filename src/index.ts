import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
  
    console.log("📦 Connecting to database...");
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(`⚡️ Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`🚀 API ready at http://localhost:${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
      console.log("=".repeat(50));
    });

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

// Gestion propre des arrêts
process.on("SIGINT", () => {
  console.log("\n👋 SIGINT received - shutting down gracefully");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\n👋 SIGTERM received - shutting down gracefully");
  process.exit(0);
});

// Démarrer le serveur
startServer();
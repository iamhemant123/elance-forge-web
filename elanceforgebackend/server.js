// Environment variables
import dotenv from "dotenv";
dotenv.config();

// Fix DNS issue
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

// Packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Local files
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import milestoneRoutes from "./routes/milestoneRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import clientAuthRoutes from "./routes/clientAuthRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

// App
const app = express();

// Trust proxy
app.set("trust proxy", 1);

// Connect database
await connectDB();

// Security
app.use(helmet());

// Rate limit
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

// Parse JSON
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api", contactRoutes);

app.use("/api", chatRoutes);

app.use("/api/client", clientAuthRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/projects", projectRoutes);
app.use("/api/documents",documentRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/payments", paymentRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ElanceForge Backend Running",
  });
});

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error.message);

  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

/* Trust Proxy (RENDER FIX) */
app.set("trust proxy", 1);

/* Database (AWAIT SAFE) */
await connectDB();

/*Security Middlewares */
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/*Body Parser */
app.use(express.json({ limit: "10kb" }));

/*Basic Sanitization*/
const sanitize = (obj) => {
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    if (key.startsWith("$") || key.includes(".")) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      sanitize(obj[key]);
    }
  }
};

app.use((req, res, next) => {
  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);
  next();
});

/* CORS (VERCEL SAFE) */
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ❗ MUST be exact Vercel URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);

/* Health Check (RENDER) */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* Routes */
app.use("/api/contact", contactRoutes);

/*  404 Handler*/
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/*Global Error Handler */
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

/*Server Start*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
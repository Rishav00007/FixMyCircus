// import connectDB from "./config/db.js";
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import complaintRoutes from "./routes/complaintRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
// dotenv.config({
//   //must need to config to use dotenv in import format
//   path: "./env",
// });

// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use("/api/complaints",complaintRoutes);
// app.use("/api/report",reportRoutes);
// app.get("/api/health", (req, res) => {
//   res.json({ message: "Server is running" });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });




// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
//import staffRoutes from "./routes/staffRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
//import analyticsRoutes from "./routes/analyticsRoutes.js";
//import publicRoutes from "./routes/publicRoutes.js";
//import { errorHandler } from "./middlewares/errorHandler.js";




dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
//app.use("/api/staff", staffRoutes);
app.use("/api/reports", reportRoutes);
//app.use("/api/analytics", analyticsRoutes);
//app.use("/api/public", publicRoutes);

// Root check
app.get("/", (req, res) => {
  res.send("✅ Caravan Chronicle Backend is Running...");
});

// Global error handler
//app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


import express from "express";
import dotenv from "dotenv";
import connectdb from "./src/config/db.js";

// Routes
import authRoutes from "./src/routes/authroutes.js";
import postRoutes from "./src/routes/postroutes.js";
import commentRoutes from "./src/routes/commentroute.js";

// Middleware
import { notFound, errorHandler } from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();

// Connect Database
connectdb();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectdb from "./src/config/db.js";


// Routes
import authRoutes from "./src/routes/authRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import commentRoutes from "./src/routes/commentroute.js";
import path from "path";
import { fileURLToPath } from "url";



dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect Database
connectdb();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});


app.use(express.static(path.join(__dirname,"..","/frontend/dist")))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(__dirname,"..", "frontend","dist","index.html"));
}) 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

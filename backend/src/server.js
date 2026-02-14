import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectdb from "./config/db.js";


// Routes
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentroute.js";
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
    origin: "https://social-peach-three.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
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

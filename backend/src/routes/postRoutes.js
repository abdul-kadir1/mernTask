import express from "express";
import {
  createPost,
  getPosts,
  getPostById,     
  getPostComments, 
  addComment,
  adminReply,deletePost, deleteComment
} from "./controllers/postController.js";
import { protect } from "./middleware/authMiddleware.js";
import { authorize } from "./middleware/adminMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createPost).get(getPosts);

// The "GET" routes for the Detail page
router.get("/:id", getPostById); 
router.get("/:id/comments", getPostComments); 

// The "POST" routes for interactions
router.post("/:id/comment", protect, addComment);
router.post("/:id/admin-reply", protect, authorize, adminReply);
router.delete("/:id", protect, deletePost);
router.delete("/comment/:id", protect, deleteComment);

export default router;
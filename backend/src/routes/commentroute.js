// src/routes/comment.routes.js
import express from "express";
import {
  addComment,
  adminReply,
  getCommentsByPost,
  deleteComment
} from "../controllers/commentcontroller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rolemiddleware.js";

const router = express.Router();
router.post("/:postId", protect, addComment);
router.post("/:postId/admin-reply", protect, authorize("admin"), adminReply);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", protect, deleteComment);

export default router;

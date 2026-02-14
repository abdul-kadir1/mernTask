import express from "express";
import {
  addComment,
  adminReply,
  getCommentsByPost,
  deleteComment
} from "../controllers/commentcontroller.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/adminMiddleware.js";

const router = express.Router();
router.post("/:postId", protect, addComment);
router.post("/:postId/admin-reply", protect, authorize("admin"), adminReply);
router.get("/:postId", getCommentsByPost);
router.delete("/:id", protect, deleteComment);

export default router;

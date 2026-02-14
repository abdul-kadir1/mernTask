import Comment from "../models/Comment.js";
import mongoose from "mongoose";



// Add normal user comment

export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      postId: req.params.postId,   // must match route param
      authorId: req.user._id,
      isAdminReply: false,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

//
// Admin reply to a post
//
export const adminReply = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    // Validate input
    if (!text) {
      return res.status(400).json({ message: "Reply text is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const comment = await Comment.create({
      text,
      postId,
      authorId: req.user._id,
      isAdminReply: true,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("ADMIN REPLY ERROR ", error);
    res.status(500).json({ message: "Failed to add admin reply" });
  }
};



// Get all comments for a post

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("authorId", "name role")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};


// Delete comment (owner or admin)

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.authorId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized to delete" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

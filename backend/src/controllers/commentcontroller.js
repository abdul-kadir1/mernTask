import comment from "../models/comment.js";
import post from "../models/post.js";


//  Add Comment (Normal User)
 
export async function addComment(req, res, next) {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: "Comment content required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      post: postId,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      comment
    });
  } catch (error) {
    next(error);
  }
}

// admin reply
export async function adminReply(req, res, next) {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    if (!content) {
      return res.status(400).json({ message: "Reply content required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const reply = await Comment.create({
      content,
      post: postId,
      author: req.user._id,
      isAdminReply: true
    });

    res.status(201).json({
      success: true,
      reply
    });
  } catch (error) {
    next(error);
  }
}

// get comments via post

export async function getCommentsByPost(req, res, next) {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name email role")
      .sort({ isAdminReply: -1, createdAt: 1 }) // admin reply first
      .lean();

    res.status(200).json({
      success: true,
      count: comments.length,
      comments
    });
  } catch (error) {
    next(error);
  }
}

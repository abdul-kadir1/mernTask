import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      authorId: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

// Get All Posts 
export const getPosts = async (req, res) => {
  try {
    
    const posts = await Post.find()
      .populate("authorId", "name") 
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      postId: req.params.id,
      authorId: req.user._id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

// Admin Reply
export const adminReply = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      postId: req.params.id,
      authorId: req.user._id,
      isAdminReply: true,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding admin reply" });
  }
};

// Get Single Post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("authorId", "name");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
};

// Get All Comments for a specific Post
export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id })
      .populate("authorId", "name role")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Delete a Post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Only author or admin can delete
    if (post.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    // Also delete all comments associated with this post
    await Comment.deleteMany({ postId: req.params.id });
    await post.deleteOne();

    res.json({ message: "Post and associated comments removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a Comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Only author or admin can delete
    if (comment.authorId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
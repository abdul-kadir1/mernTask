

import { create, find, findById } from "../models/post.js";

//  Creating Post 
export async function createPost(req, res, next) {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const post = await create({
      title,
      content,
      author: req.user._id
    });

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    next(error);
  }
}

// Getting post
export async function getPosts(req, res, next) {
  try {
    const posts = await find()
      .populate("author", "name email role")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: posts.length,
      posts
    });
  } catch (error) {
    next(error);
  }
}

// getting post by id
export async function getPostById(req, res, next) {
  try {
    const post = await findById(req.params.id)
      .populate("author", "name email role");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      success: true,
      post
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    const post = await findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog, likeBlog, unlikeBlog, toggleLike } from "../controllers/blog.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const blogRouter = express.Router()

blogRouter.post("/", authenticateToken, createBlog); // CREATE - Protected
blogRouter.get("/", getAllBlogs); // READ ALL - Public
blogRouter.get("/:id", getBlogById); // READ ONE - Public
blogRouter.put("/:id", authenticateToken, updateBlog); // UPDATE - Protected
blogRouter.delete("/:id", authenticateToken, deleteBlog); // DELETE - Protected

// Like/Unlike Routes - All Protected
blogRouter.post("/:id/like", authenticateToken, likeBlog); // LIKE - Protected
blogRouter.delete("/:id/like", authenticateToken, unlikeBlog); // UNLIKE - Protected
blogRouter.post("/:id/toggle-like", authenticateToken, toggleLike); // TOGGLE LIKE - Protected

export default blogRouter
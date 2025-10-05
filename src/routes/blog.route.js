import express from "express"
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlog } from "../controllers/blog.controller.js";

const blogRouter = express.Router()

blogRouter.post("/", createBlog); // CREATE
blogRouter.get("/", getAllBlogs); // READ ALL
blogRouter.get("/:id", getBlogById); // READ ONE
blogRouter.put("/:id", updateBlog); // UPDATE
blogRouter.delete("/:id", deleteBlog); // DELETE

export default blogRouter
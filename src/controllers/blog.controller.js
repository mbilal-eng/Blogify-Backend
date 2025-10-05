
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

// ✅ CREATE BLOG
export const createBlog = async (req, res) => {
    try {
        const { author, title, except, content, coverImage, tags, status } = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and Content are required" });
        }

        // Check if author exists
        const user = await User.findById(author);
        if (!user) {
            return errorResponse(res, "Author not Found", {}, 404)
        }

        const newBlog = await Blog.create({
            author,
            title,
            except,
            content,
            coverImage,
            tags,
            status,
        });

        return successResponse(res, "Blog Create Successfull", newBlog, 201);
    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate("author", "name email avatar")
            .sort({ createdAt: -1 });

        return successResponse(res, "Blogs Fetched Succefully", {
            total: blogs.length,
            blogs
        }, 200)

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ GET SINGLE BLOG BY ID
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id)
            .populate("author", "name email avatar")
            .populate("comments.user", "name email avatar");

        if (!blog) {
            return errorResponse(res, "Blog not found", error, 404);
        }

        return successResponse(res, "Blogs Fetched Succefully", blog, 200);
    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ UPDATE BLOG
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const blog = await Blog.findByIdAndUpdate(id, updates, { new: true });

        if (!blog) {
            return errorResponse(res, "Blog not found", error, 404);
        }

        return successResponse(res, "Blogs updated Succefully", blog, 200);

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ DELETE BLOG
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return errorResponse(res, "Blog not found", error, 404);
        }
        return successResponse(res, "Blogs deleted Succefully", {}, 200);

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

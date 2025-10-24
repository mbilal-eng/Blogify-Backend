
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

// ✅ CREATE BLOG
export const createBlog = async (req, res) => {
    try {
        const { title, except, content, coverImage, tags, status } = req.body;
        const author = req.user._id; // Get author from authenticated user

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and Content are required" });
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

        // Add like information for authenticated users
        const blogsWithLikeInfo = blogs.map(blog => {
            let isLiked = false;
            if (req.user) {
                isLiked = blog.isLikedBy(req.user._id);
            }
            return {
                ...blog.toObject(),
                isLiked
            };
        });

        return successResponse(res, "Blogs Fetched Succefully", {
            total: blogsWithLikeInfo.length,
            blogs: blogsWithLikeInfo
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

        // Check if user is authenticated and has liked this blog
        let isLiked = false;
        if (req.user) {
            isLiked = blog.isLikedBy(req.user._id);
        }

        const blogData = {
            ...blog.toObject(),
            isLiked
        };

        return successResponse(res, "Blogs Fetched Succefully", blogData, 200);
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

// ✅ LIKE BLOG
export const likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(id);
        if (!blog) {
            return errorResponse(res, "Blog not found", {}, 404);
        }

        // Check if user already liked this blog
        const alreadyLiked = blog.likes.includes(userId);
        if (alreadyLiked) {
            return errorResponse(res, "You have already liked this blog", {}, 400);
        }

        // Add user to likes array and increment counter
        blog.likes.push(userId);
        blog.likesCount = blog.likes.length;
        await blog.save();

        return successResponse(res, "Blog liked successfully", {
            likesCount: blog.likesCount,
            isLiked: true
        }, 200);

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ UNLIKE BLOG
export const unlikeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(id);
        if (!blog) {
            return errorResponse(res, "Blog not found", {}, 404);
        }

        // Check if user has liked this blog
        const userLiked = blog.likes.includes(userId);
        if (!userLiked) {
            return errorResponse(res, "You haven't liked this blog yet", {}, 400);
        }

        // Remove user from likes array and decrement counter
        blog.likes = blog.likes.filter(likeId => likeId.toString() !== userId.toString());
        blog.likesCount = blog.likes.length;
        await blog.save();

        return successResponse(res, "Blog unliked successfully", {
            likesCount: blog.likesCount,
            isLiked: false
        }, 200);

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

// ✅ TOGGLE LIKE (Like if not liked, Unlike if already liked)
export const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const blog = await Blog.findById(id);
        if (!blog) {
            return errorResponse(res, "Blog not found", {}, 404);
        }

        const alreadyLiked = blog.likes.includes(userId);
        
        if (alreadyLiked) {
            // Unlike the blog
            blog.likes = blog.likes.filter(likeId => likeId.toString() !== userId.toString());
            blog.likesCount = blog.likes.length;
            await blog.save();

            return successResponse(res, "Blog unliked successfully", {
                likesCount: blog.likesCount,
                isLiked: false
            }, 200);
        } else {
            // Like the blog
            blog.likes.push(userId);
            blog.likesCount = blog.likes.length;
            await blog.save();

            return successResponse(res, "Blog liked successfully", {
                likesCount: blog.likesCount,
                isLiked: true
            }, 200);
        }

    } catch (error) {
        return errorResponse(res, "Server Error", error, 500);
    }
};

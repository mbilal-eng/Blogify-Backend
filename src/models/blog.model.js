import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        maxlength: 150
    },
    except: {
        type: String,
        maxlength: 200
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    coverImage: {
        type: String,
        default: ""
    },
    tags: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date, default: Date.now
            }
        }
    ]

}, { timestamps: true });

// Method to check if a user has liked this blog
blogSchema.methods.isLikedBy = function(userId) {
    return this.likes.includes(userId);
};

// Pre-save middleware to ensure likesCount is always in sync
blogSchema.pre('save', function(next) {
    this.likesCount = this.likes.length;
    next();
});

const Blog = mongoose.model("blog", blogSchema)

export default Blog;
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


const Blog = mongoose.model("blog", blogSchema)

export default Blog;
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required!"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required!"],
            trim: true,
            minlength: [true, "Password must be greater than 6 letters"],
            select: false // hide password from queries by default
        },
        phone: {
            type: String,
        },
        bio: {
            type: String,
            default: "This user hasn't added a bio yet.",
        },
        city: {
            type: String,
        },
        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        },
        website: {
            type: String,
        },
        social: {
            type: [String],
            default: [],
            validate: {
                validator: (arr) => arr.length <= 5, // limit to 5 links
                message: "You can only add up to 5 social links.",
            },
        },

    }, { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema)

export default User;
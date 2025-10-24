import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { generateToken } from "../middleware/auth.middleware.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, bio, city, avatar, website, social } = req.body;

        if (!name) {
            return errorResponse(res, "Name feild is required")
        }

        if (!email) {
            return errorResponse(res, "Email feild is required")
        }

        if (!password) {
            return errorResponse(res, "Password feild is required")
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return errorResponse(res, "User already exist with this email")
        }

        const newUser = await User.create({ name, email, password, phone, bio, city, avatar, website, social });

        // Generate JWT token
        const token = generateToken(newUser._id);

        return successResponse(res, "User Register Successfully", {
            user: newUser,
            token
        }, 201)
    } catch (error) {
        console.log("ERROR:", error)
        return errorResponse(res, "something went wrong", error, 500)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return errorResponse(res, "Email and Password is required")
        }

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return errorResponse(res, "Invalid Credentials", {}, 401)
        }

        // Verify password using bcrypt
        const isPasswordValid = await existingUser.comparePassword(password);
        if (!isPasswordValid) {
            return errorResponse(res, "Invalid Credentials", {}, 401)
        }

        // Generate JWT token
        const token = generateToken(existingUser._id);

        // Remove password from response
        const userWithoutPassword = await User.findById(existingUser._id).select("-password");

        return successResponse(res, "Login Successful", {
            user: userWithoutPassword,
            token
        }, 200)
    } catch (error) {
        console.log("ERROR:", error)
        return errorResponse(res, "something went wrong", error, 500)
    }
}
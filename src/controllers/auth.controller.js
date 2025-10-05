import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js"

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

        return successResponse(res, "User Register Succefully", newUser, 201)
    } catch (error) {
        console.log("ERROR:", error)
        return errorResponse(res, "something went wrong", error, 500)
    }
}

export const lgoinUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return errorResponse(res, "Email and Password is required")
        }

        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return errorResponse(res, "User Not Found", {}, 404)
        }

        console.log(password, existingUser)
        // verify password
        if (existingUser.password !== password) {
            return errorResponse(res, "Invalid Credentials")
        }

        return successResponse(res, "Login Successfull", existingUser, 200)
    } catch (error) {
        console.log("ERROR:", error)
        return errorResponse(res, "something went wrong", error, 500)
    }
}
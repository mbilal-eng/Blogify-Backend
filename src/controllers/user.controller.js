import User from "../models/user.model.js"
import { errorResponse, successResponse } from "../utils/responseHandler.js"

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if (users.length <= 0) {
            return errorResponse(res, "No User Yet.")
        }

        return successResponse(res, "Users fetched", users, 200)

    } catch (error) {
        return errorResponse(res, "Something went wrong", error, 500)
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params

        console.log(id)
        const user = await User.findById(id).select("-password");

        if (!user) {
            return errorResponse(res, "User Not Found", {}, 404)
        }

        return successResponse(res, "User fetched", user, 200)

    } catch (error) {
        return errorResponse(res, "Something went wrong", error, 500)
    }
}
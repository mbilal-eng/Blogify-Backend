import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorResponse } from "../utils/responseHandler.js";

export const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return errorResponse(res, "Access token is required", {}, 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) {
            return errorResponse(res, "Invalid token - user not found", {}, 401);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return errorResponse(res, "Invalid token", {}, 401);
        } else if (error.name === 'TokenExpiredError') {
            return errorResponse(res, "Token expired", {}, 401);
        }
        return errorResponse(res, "Authentication failed", error, 401);
    }
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

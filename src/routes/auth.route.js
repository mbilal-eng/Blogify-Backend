import express from "express";
import { lgoinUser, registerUser } from "../controllers/auth.controller.js";


const authRouter = express.Router()

// register user
authRouter.post("/register", registerUser)
authRouter.post("/login", lgoinUser)

export default authRouter
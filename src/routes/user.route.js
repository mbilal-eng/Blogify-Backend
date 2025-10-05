import express from "express"
import { getAllUser, getUserById } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/", getAllUser)
userRouter.get("/:id/me", getUserById)

export default userRouter
import express from "express"
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";

// Load env variables
dotenv.config();

const app = express()
const PORT = process.env.PORT || 4000;

// Connect Database
connectDB();

// Global Middlewares
app.use(express.json()) // accpet request body data

// URL Routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/user", userRouter)

// Server Testing APi
app.get("/test", (req, res) => {
    return res.status(200).json({
        status: 200, message: "Server is Running"
    })
});

// Server Error Middleware


// app listen
app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
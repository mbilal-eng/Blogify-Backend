import express from "express"

const app = express()
const PORT = 3000;

// Global Middlewares
app.use(express.json()) // accpet request body data

// URL Routes


// Server Testing APi
app.get("/test", (req, res) => {
    return res.status(200).json({
        status: 200, message: "Server is Running"
    })
})

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`)
})
import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.rout.js"
import userRouter from "./routes/user.rout.js";
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"

const app = express()

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173").split(",").map((origin) => origin.trim()).filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }

        callback(new Error("Not allowed by CORS"))
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "PrepBot AI API is running" })
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    await connectDb()
})


import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import socialRoutes from "./routes/social.routes";
import postRoutes from "./routes/post.routes";
import chatRoutes from "./routes/chat.routes";

const app: Express = express();

// Middleware
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api", limiter);

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:5173", `${process.env.FRONTEND_URL || "http://localhost:5173"}`],
        credentials: true,
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);

// Basic Route
app.get("/", (req: Request, res: Response) => {
    res.send("API is running...");
});

// Custom Error Interface
interface CustomError extends Error {
    status?: number;
    statusCode?: number;
    errors?: unknown;
}

// Error Handling Middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    const customError = err as CustomError;
    console.error(customError.stack);

    const status = customError.status || customError.statusCode || 500;
    const message = customError.message || "Something went wrong";

    res.status(status).json({
        success: false,
        status,
        message,
        errors: customError.errors || undefined
    });
});


export default app;

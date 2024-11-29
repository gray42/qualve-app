//dependencies
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

//route imports
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

//.env
dotenv.config();

//express
const app = express();
app.use(express.json());

//cors
app.use(
    cors({
        origin: "https://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

//server connection
mongoose
    .connect(process.env.MONGO_URI)
    .then()
    .catch((err) => {
        console.error("Could not connect to MongoDB", err);
    });

//server start
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log("Connected to QualveDB!");
});

//middleware
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

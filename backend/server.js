//dependencies
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// socket io
import http from "http";
import { Server as SocketServer } from "socket.io";

//route imports
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import tagRoutes from "./routes/tags.js";
import notiRoutes from "./routes/noti.js";
import searchRoutes from "./routes/search.js";
import adminRoutes from "./routes/admin.js";

//.env
dotenv.config();

//express
const app = express();
app.use(express.json());

//cors
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		credentials: true,
	})
);

//cookie parser
app.use(cookieParser());

// server + socket.io
const server = http.createServer(app);

const io = new SocketServer(server, {
	cors: {
		origin: process.env.CLIENT_URL,
		credentials: true,
	},
});

// Store userId → socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
	console.log("Socket connected:", socket.id);

	socket.on("register", (userId) => {
		onlineUsers.set(userId, socket.id);
	});

	socket.on("disconnect", () => {
		for (const [userId, socketId] of onlineUsers.entries()) {
			if (socketId === socket.id) {
				onlineUsers.delete(userId);
				break;
			}
		}
		console.log("Socket disconnected:", socket.id);
	});
});

//server connection
mongoose
	.connect(process.env.MONGO_URI)
	.then()
	.catch((err) => {
		console.error("Could not connect to MongoDB", err);
	});

//server start
const port = process.env.PORT || 3000;
// changed from app to server for socket io
server.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
	console.log("Connected to QualveDB!");
});

//middleware
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/notifications", notiRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/admin", adminRoutes);

// socket io
export { io, onlineUsers };

import express from "express";
import { getUserNotifications } from "../controllers/notificationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authenticateToken, getUserNotifications);

export default router;

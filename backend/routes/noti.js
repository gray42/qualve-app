import express from "express";
import {
	getUserNotifications,
	markAsRead,
} from "../controllers/notificationController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authenticateToken, getUserNotifications);
router.get("/:id/read", authenticateToken, markAsRead);

export default router;

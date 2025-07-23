import express from "express";
import {
	authenticateToken,
	verifyAdmin,
} from "../middleware/authMiddleware.js";
import { adminAnalytics } from "../controllers/adminController.js";

const router = express.Router();

router.get("/", authenticateToken, verifyAdmin, adminAnalytics);

export default router;

import express from "express";
import { createPost, getPost, getPostWithId } from "../controllers/questionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

//get all questions
router.get("/", getPost);

//show a question (:id)
router.get("/:id", authenticateToken, getPostWithId);

//post a question
router.post("/", authenticateToken, createPost);

export default router;
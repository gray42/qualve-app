import express from "express";
import {
	createPost,
	getPost,
	getPostWithId,
} from "../controllers/questionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { addAnswer } from "../controllers/answerController.js";
import { getQuestionByTag } from "../controllers/tagController.js";
import { getQuestionBySearch } from "../controllers/searchController.js";
import { votingSystem } from "../controllers/votingController.js";
const router = express.Router();

//get all questions
router.get("/", getPost);

//show a question (:id)
router.get("/:id", authenticateToken, getPostWithId);

//post a question
router.post("/", authenticateToken, createPost);

//add answer
router.post("/:id/answers", authenticateToken, addAnswer);

//get questions by tag
router.get("/tag/:tag", authenticateToken, getQuestionByTag);

//get questions by search
router.get("/search", authenticateToken, getQuestionBySearch);

//adjust votes
router.patch("/:id/vote", authenticateToken, votingSystem);

export default router;

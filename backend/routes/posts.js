import express from "express";
import {
	createPost,
	getPost,
	getPostWithId,
	getPostsByUserId,
	getHotPosts,
} from "../controllers/questionController.js";
import { getTrendingTags } from "../controllers/tagController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { addAnswer } from "../controllers/answerController.js";
import { getQuestionBySearch } from "../controllers/searchController.js";
import { vote } from "../controllers/votingController.js";
const router = express.Router();

//get all questions
router.get("/", getPost);

//get trending tags
router.get("/trending-tags", getTrendingTags);

//get hot posts
router.get("/hot", getHotPosts);

//show a question (:id)
router.get("/:id", getPostWithId);

//post a question
router.post("/", authenticateToken, createPost);

//add answer
router.post("/:id/answers", authenticateToken, addAnswer);

//get questions by search
router.get("/search", authenticateToken, getQuestionBySearch);

//adjust votes
router.post("/:postId/vote", authenticateToken, vote);

// GET /api/posts/user/:userId
router.get("/user/:userId", authenticateToken, getPostsByUserId);

export default router;

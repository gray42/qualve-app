import express from "express";
import {
	createPost,
	getPost,
	getPostWithId,
	getPostsByUserId,
	getHotPosts,
	isAnswered,
} from "../controllers/questionController.js";
import {
	getTrendingTags,
	getPostsByTag,
} from "../controllers/tagController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { addAnswer, approveAnswer } from "../controllers/answerController.js";
import { vote } from "../controllers/votingController.js";
const router = express.Router();

// update question status
router.patch(
	"/:postId/answers/:answerId/approve",
	authenticateToken,
	approveAnswer
);

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

//adjust votes
router.post("/:postId/vote", authenticateToken, vote);

// GET /api/posts/user/:userId
router.get("/user/:userId", authenticateToken, getPostsByUserId);

router.get("/tags/:tag", authenticateToken, getPostsByTag);

export default router;

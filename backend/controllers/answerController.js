import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";

//POST /:id/answer (add answer to question)
export const addAnswer = async (req, res) => {
	try {
		const questionId = req.params.id;
		const post = await Post.findById(questionId);
		if (!post) {
			return res.status(404).json({ message: "Question not found." });
		}

		const answer = {
			author: req.user._id,
			body: req.body.answer,
			username: req.user.username,
			createdAt: new Date(),
		};
		post.answers.push(answer);
		await post.save();
		res.status(201).json({ message: "Answer added successfully.", answer });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//PATCH approve answer /:postId/answers/:answerId/approve
export const approveAnswer = async (req, res) => {
	try {
		const { postId, answerId } = req.params;
		const userId = req.user._id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		// Check if the current user is the post author
		if (post.author.toString() !== userId) {
			return res
				.status(403)
				.json({ message: "Only the post author can approve answers" });
		}

		const answer = post.answers.id(answerId);
		if (!answer) {
			return res.status(404).json({ message: "Answer not found" });
		}
		answer.isApproved = true;
		answer.approvedAt = new Date();
		post.isAnswered = true;

		await post.save();
		res.status(201).json({ message: "Answer updated successfully.", post });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

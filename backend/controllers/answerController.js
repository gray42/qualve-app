import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import { Notification } from "../models/notificationSchema.js";

//POST /:id/answer (add answer to question)
export const addAnswer = async (req, res) => {
	try {
		const questionId = req.params.id;
		const answerUserId = req.user._id;
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

		await User.findByIdAndUpdate(req.user._id, {
			$inc: { reputation: 100, "stats.answersGiven": 1 },
		});
		const updatedUser = await User.findById(req.user._id).select("reputation");

		try {
			// create notification when answer is approved
			if (!post.author.equals(answerUserId)) {
				await Notification.create({
					userId: post.author, // send it to
					type: "answer",
					from: answerUserId,
					resourceId: questionId,
					resourceType: "Question",
					resourceText: req.body.answer.slice(0, 100),
				});
			}
		} catch (notificationError) {
			console.error("Notification error:", notificationError);
		}

		await post.save();
		res.status(201).json({ answer, updatedReputation: updatedUser.reputation });
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

		await User.findByIdAndUpdate(answer.author, {
			$inc: { reputation: 150, "stats.answersApproved": 1 },
		});
		const updatedUser = await User.findById(answer.author).select("reputation");

		try {
			// create notification when answer is approved
			if (!answer.author.equals(userId)) {
				await Notification.create({
					userId: answer.author,
					type: "approve",
					from: userId,
					resourceId: postId,
					resourceType: "Answer",
				});
			}
		} catch (notificationError) {
			console.error("Notification error:", notificationError);
		}

		await post.save();
		res.status(201).json({ post, updatedReputation: updatedUser.reputation });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

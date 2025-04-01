import e from "express";
import { Post } from "../models/postSchema.js";

//update votes for question or answer - "/:postId/vote"
export const vote = async (req, res) => {
	const { postId } = req.params;
	const { answerId, voteType } = req.body;
	const userId = req.user._id;

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });

		if (answerId) {
			const answer = post.answers.id(answerId);
			if (!answer) return res.status(404).json({ message: "Answer not found" });

			const currentVote = answer.voters.get(userId);

			if (currentVote === voteType) {
				if (voteType === "upvote") {
					answer.upvotes -= 1;
				} else {
					answer.downvotes -= 1;
				}
				answer.voters.delete(userId);
			} else {
				if (currentVote === "upvote") answer.upvotes -= 1;
				if (currentVote === "downvote") answer.downvotes -= 1;

				if (voteType === "upvote") answer.upvotes += 1;
				if (voteType === "downvote") answer.downvotes += 1;

				answer.voters.set(userId, voteType);
			}
		} else {
			const currentVote = post.voters.get(userId);

			if (currentVote === voteType) {
				if (voteType === "upvote") post.upvotes -= 1;
				else post.downvotes -= 1;
				post.voters.delete(userId);
			} else {
				if (currentVote === "upvote") post.upvotes -= 1;
				if (currentVote === "downvote") post.downvotes -= 1;

				if (voteType === "upvote") post.upvotes += 1;
				if (voteType === "downvote") post.downvotes += 1;

				post.voters.set(userId, voteType);
			}
		}

		await post.save();
		res.json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

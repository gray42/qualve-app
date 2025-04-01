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

			answer.upvotes = answer.upvotes.filter((id) => id.toString() !== userId);
			answer.downvotes = answer.downvotes.filter(
				(id) => id.toString() !== userId
			);

			if (voteType === "upvote") {
				if (!answer.upvotes.includes(userId)) {
					answer.upvotes.push(userId);
				}
			} else if (voteType === "downvote") {
				if (!answer.downvotes.includes(userId)) {
					answer.downvotes.push(userId);
				}
			}
		} else {
			post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
			post.downvotes = post.downvotes.filter((id) => id.toString() !== userId);

			if (voteType === "upvote") {
				if (!post.upvotes.includes(userId)) {
					post.upvotes.push(userId);
				}
			} else if (voteType === "downvote") {
				if (!post.downvotes.includes(userId)) {
					post.downvotes.push(userId);
				}
			}
		}

		await post.save();
		res.json({ message: "Vote successful", post });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

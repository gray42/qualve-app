import { User } from "../models/userSchema.js";
import { Post } from "../models/postSchema.js";

const updateVotes = (target, userId, voteType, repWeights) => {
	const currentVote = target.voters.get(userId);
	let repChange = 0;
	// remove current vote
	if (currentVote === voteType) {
		if (voteType === "upvote") target.upvotes--;
		if (voteType === "downvote") target.downvotes--;
		target.voters.delete(userId);
		repChange =
			voteType === "upvote" ? -repWeights.upvote : repWeights.downvote;
		return repChange;
	}
	// remove previous vote if exists
	if (currentVote === "upvote") {
		target.upvotes--;
		repChange -= repWeights.upvote;
	}
	if (currentVote === "downvote") {
		target.downvotes--;
		repChange += repWeights.downvote;
	}
	// add new vote
	if (voteType === "upvote") {
		target.upvotes++;
		repChange += repWeights.upvote;
	}
	if (voteType === "downvote") {
		target.downvotes++;
		repChange -= repWeights.downvote;
	}

	target.voters.set(userId, voteType);
	return repChange;
};
//update votes for question or answer - "/:postId/vote"
export const vote = async (req, res) => {
	const { postId } = req.params;
	const { answerId, voteType } = req.body;
	const userId = req.user._id;

	if (!["upvote", "downvote"].includes(voteType)) {
		return res.status(400).json({ message: "Invalid vote type." });
	}

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });

		let repChange = 0;

		if (answerId) {
			const answer = post.answers.id(answerId);
			if (!answer) return res.status(404).json({ message: "Answer not found" });

			// prevent voting on own answer
			/* if (answer.author.equals(userId)) {
				return res
					.status(403)
					.json({ message: "You can't vote on your own answer." });
			} */
			const currentVote = answer.voters.get(userId);
			let upvoteDelta = 0;
			let downvoteDelta = 0;

			// Calculate deltas based on vote transitions
			if (currentVote === voteType) {
				// Removing vote
				if (voteType === "upvote") upvoteDelta = -1;
				if (voteType === "downvote") downvoteDelta = -1;
			} else {
				// Adding new vote (and potentially removing old)
				if (currentVote === "upvote") upvoteDelta = -1;
				if (currentVote === "downvote") downvoteDelta = -1;

				if (voteType === "upvote") upvoteDelta += 1;
				if (voteType === "downvote") downvoteDelta += 1;
			}

			repChange = updateVotes(answer, userId, voteType, {
				upvote: 15,
				downvote: 15,
			});

			await User.findByIdAndUpdate(answer.author, {
				$inc: {
					reputation: repChange,
					"stats.upvotesReceived": upvoteDelta,
					"stats.downvotesReceived": downvoteDelta,
				},
			});
		} else {
			// prevent voting on own post
			/* if (post.author.equals(userId)) {
				return res
					.status(403)
					.json({ message: "You can't vote on your own post." });
			} */
			const currentVote = post.voters.get(userId);
			let upvoteDelta = 0;
			let downvoteDelta = 0;

			// Calculate deltas based on vote transitions
			if (currentVote === voteType) {
				// Removing vote
				if (voteType === "upvote") upvoteDelta = -1;
				if (voteType === "downvote") downvoteDelta = -1;
			} else {
				// Adding new vote (and potentially removing old)
				if (currentVote === "upvote") upvoteDelta = -1;
				if (currentVote === "downvote") downvoteDelta = -1;

				if (voteType === "upvote") upvoteDelta += 1;
				if (voteType === "downvote") downvoteDelta += 1;
			}

			repChange = updateVotes(post, userId, voteType, {
				upvote: 10,
				downvote: 10,
			});

			await User.findByIdAndUpdate(post.author, {
				$inc: {
					reputation: repChange,
					"stats.upvotesReceived": upvoteDelta,
					"stats.downvotesReceived": downvoteDelta,
				},
			});
		}

		const updatedUser = await User.findById(userId).select("reputation");
		await post.save();
		res.status(200).json({ post, updatedReputation: updatedUser.reputation });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

import { Post } from "../models/postSchema.js";

//POST /:id/answer (add answer to question)
export const addAnswer = async (req, res) => {
	const questionId = req.params.id;
	const { author, body } = req.body;

	if (!author) {
		return res.status(400).json({ message: "Author not found." });
	}
	if (!body) {
		return res.status(400).json({ message: "Answer not found." });
	}
	try {
		const newAnswer = new Post({ author, body });
		const updatedPost = await Post.updateOne(
			{ _id: questionId },
			{ $push: { answers: newAnswer } },
			{ new: true }
		);

		res.status(200).json({ message: "Answer submitted.", updatedPost });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

//PATCH /answers/:id/vote (upvote/downvote)

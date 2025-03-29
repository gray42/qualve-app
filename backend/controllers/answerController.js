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

//PATCH /answers/:id/vote (upvote/downvote)

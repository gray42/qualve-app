import { Post } from "../models/postSchema.js";

//GET /tag/:tag (fetch questions by tag)

export const getQuestionByTag = async (req, res) => {
	try {
		const tag = req.params.tag;
		const posts = await Post.find({ tags: tag });
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

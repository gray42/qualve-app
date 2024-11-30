import { Post } from "../models/postSchema.js";

//GET /search/:search (fetch questions by tag)

export const getQuestionBySearch = async (req, res) => {
	try {
		const { title, body, tag } = req.query;
		const query = {};

		if (tag) query.tags = { $in: [tag] };
		if (title || body)
			query.title, (query.body = { $regex: title, body, $options: "i" });
		const posts = await Post.find({ query });
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

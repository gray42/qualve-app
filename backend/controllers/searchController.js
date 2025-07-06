import { Post } from "../models/postSchema.js";

export const getQuestionBySearch = async (req, res) => {
	try {
		const { title, body, tag } = req.query;
		const query = {};

		if (tag) query.tags = { $in: [tag] };
		if (title) query.title = { $regex: title, $options: "i" };
		if (body) query.body = { $regex: body, $options: "i" };

		const posts = await Post.find(query);
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

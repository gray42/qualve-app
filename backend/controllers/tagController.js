import { Post } from "../models/postSchema.js";

export const getTrendingTags = async (req, res) => {
	try {
		const tags = await Post.aggregate([
			{ $unwind: "$tags" },
			{ $group: { _id: "$tags", count: { $sum: 1 } } },
			{ $sort: { count: -1 } },
			{ $limit: 10 },
		]);
		res.json(tags);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getPostsByTag = async (req, res) => {
	try {
		const { tag } = req.params;

		const posts = await Post.find({ tags: { $in: [tag] } });

		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json("error getting posts by tag");
	}
};

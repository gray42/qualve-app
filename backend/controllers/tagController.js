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

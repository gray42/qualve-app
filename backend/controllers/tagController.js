import { Post } from "../models/postSchema.js";
import { Tag } from "../models/tagSchema.js";

export const getTrendingTags = async (req, res) => {
	try {
		const tags = await Post.aggregate([
			{ $unwind: "$tags" }, // flatten tags array
			{ $group: { _id: "$tags", count: { $sum: 1 } } }, // group by tag ObjectId and count
			{ $sort: { count: -1 } }, // sort descending by count
			{ $limit: 5 }, // top 10 tags
			{
				$lookup: {
					from: "tags", // name of the tags collection (usually lowercase plural)
					localField: "_id", // field from the Post aggregation (_id = tag ObjectId)
					foreignField: "_id", // field from the tags collection
					as: "tagInfo",
				},
			},
			{ $unwind: "$tagInfo" }, // convert tagInfo array to object
			{
				$project: {
					_id: 1,
					count: 1,
					name: "$tagInfo.name", // include tag name in output
				},
			},
		]);
		res.json(tags);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getPostsByTag = async (req, res) => {
	try {
		const { tag } = req.params;

		const tagN = await Tag.findOne({ name: tag });

		if (!tagN) {
			return res.status(404).json({ message: "Tag not found" });
		}

		const posts = await Post.find({ tags: tagN._id }).populate("tags", "name");
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json("error getting posts by tag");
	}
};

export const searchTags = async (req, res) => {
	try {
		const query = req.query.query || "";
		const tags = await Tag.find({
			name: { $regex: query, $options: "i" },
		}).limit(10);
		res.json(tags);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getTags = async (req, res) => {
	try {
		const tags = await Tag.find().sort({ createdAt: -1 });
		res.status(200).json(tags);
	} catch (error) {
		res.status(500).json({ message: "error fetching posts", error });
	}
};

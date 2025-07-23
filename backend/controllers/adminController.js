import { User } from "../models/userSchema.js";
import { Post } from "../models/postSchema.js";
import { Tag } from "../models/tagSchema.js";

export const adminAnalytics = async (req, res) => {
	try {
		const totalUsers = await User.countDocuments();
		const topUsers = await User.find().sort({ reputation: -1 }).limit(5);
		const totalPosts = await Post.countDocuments();
		const usersPerMonth = await User.aggregate([
			{
				$group: {
					_id: { $month: "$createdAt" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]);
		const postsPerDay = await Post.aggregate([
			{
				$group: {
					_id: {
						$dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
					},
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]);
		const tagUsage = await Tag.find(
			{},
			{ name: 1, usageCount: 1, _id: 0 }
		).sort({ usageCount: -1 });

		res
			.status(201)
			.json({
				totalUsers,
				topUsers,
				totalPosts,
				usersPerMonth,
				postsPerDay,
				tagUsage,
			});
	} catch (error) {
		console.error("Error getting admin analytics", error);
		res.status(500).json({ message: error.message });
	}
};

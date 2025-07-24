import { User } from "../models/userSchema.js";
import { Post } from "../models/postSchema.js";
import { Tag } from "../models/tagSchema.js";

export const adminAnalytics = async (req, res) => {
	// get and initialize date params
	const date = req.query;
	const startDate = new Date(date.start);
	const endDate = new Date(date.end);

	try {
		const totalUsers = await User.countDocuments();
		const topUsers = await User.find().sort({ reputation: -1 }).limit(5);
		const totalPosts = await Post.countDocuments();
		const totalAnswers = await Post.aggregate([
			/* {
				$group: {
					_id: null,
					totalAnswers: { $sum: "numAnswers" },
				},
			}, */
			{
				$project: {
					answerCount: { $size: "$answers" },
				},
			},
			{
				$group: {
					_id: null,
					totalAnswers: { $sum: "$answerCount" },
				},
			},
		]);
		const totalAnswersCount = totalAnswers[0]?.totalAnswers || 0;
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
				$match: {
					// match date params
					createdAt: {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
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
		/* const end = new Date();
		end.setHours(0, 0, 0, 0);
		const start = new Date(end);
		start.setDate(end.getDate() - 6); // a week in the past */
		const answersPerDay = await getDailyAnswerData(startDate, endDate);
		const tagUsage = await Tag.find(
			{},
			{ name: 1, usageCount: 1, _id: 0 }
		).sort({ usageCount: -1 });

		res.status(201).json({
			totalUsers,
			topUsers,
			totalPosts,
			totalAnswers: totalAnswersCount,
			usersPerMonth,
			postsPerDay,
			answersPerDay,
			tagUsage,
		});
	} catch (error) {
		console.error("Error getting admin analytics", error);
		res.status(500).json({ message: error.message });
	}
};

const getDailyAnswerData = async (startDate, endDate) => {
	try {
		const answersPerDay = await Post.aggregate([
			// get answer day and count
			{ $unwind: "$answers" },
			{
				$match: {
					// match date params
					"answers.createdAt": {
						$gte: startDate,
						$lte: endDate,
					},
				},
			},
			{
				$group: {
					_id: {
						$dateToString: {
							format: "%Y-%m-%d",
							date: "$answers.createdAt",
							timezone: "UTC",
						},
					},
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } },
		]);

		const dateArray = getDatesInRange(startDate, endDate); // initialize date array

		return dateArray.map((date) => {
			// for each date in the array, map the answer to the correct date
			const foundData = answersPerDay.find((a) => a._id === date);

			return {
				date,
				count: foundData?.count || 0,
			};
		});
	} catch (error) {
		throw error;
	}
};

function getDatesInRange(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		dates.push(currentDate.toISOString().split("T")[0]);
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dates;
}

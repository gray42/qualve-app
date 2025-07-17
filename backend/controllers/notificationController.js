import { Notification } from "../models/notificationSchema.js";

export const getUserNotifications = async (req, res) => {
	const userId = req.user._id;
	try {
		const notifications = await Notification.find({ userId })
			.sort({ createdAt: -1 })
			.populate("from", "username");
		res.status(200).json({ notifications });
	} catch (error) {
		console.error("Error fetching notifications:", error);
		return res.status(500).json({
			message: "Error fetching user's notifications",
			error: error.message,
		});
	}
};

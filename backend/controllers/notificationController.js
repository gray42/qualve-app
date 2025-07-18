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

export const markAsRead = async (req, res) => {
	const { id } = req.params;
	const userId = req.user._id;
	try {
		const notification = await Notification.findByIdAndUpdate(
			{ _id: id, userId },
			{ isRead: true },
			{ new: true }
		);
		if (!notification)
			return res.status(400).json({ error: "Notification not found" });

		res.status(200).json(notification);
	} catch (error) {
		console.error("Error marking notification as read", error);
	}
};

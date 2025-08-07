import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
	{
		userId: {
			// user that gets notification
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		type: {
			// notification action
			type: String,
			enum: ["answer", "approve", "upvote", "downvote"],
		},
		from: {
			// who performed action
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		resourceId: {
			// what was modified
			type: mongoose.Schema.Types.ObjectId,
		},
		resourceType: {
			type: String,
			enum: ["Question", "Answer", "Vote"],
		},
		resourceText: {
			type: String,
		},
		resourceTitle: {
			type: String,
		},
		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

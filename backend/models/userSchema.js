import mongoose from "mongoose";

// Define a schema for a simple user
const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
		role: {
			type: String,
			enum: ["tutor", "learner"],
		},
		age: {
			type: Number,
			required: false,
		},
		preferredTags: [{ type: String }],
		posts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post",
			},
		],
	},
	{ timestamps: true }
);

// Create a model from the schema
export const User = mongoose.model("User", UserSchema);

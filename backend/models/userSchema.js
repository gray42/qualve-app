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
		name: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},
		school: {
			type: String,
			default: "",
		},
		classes: {
			english: { type: String, default: "" },
			math: { type: String, default: "" },
			history: { type: String, default: "" },
			science: { type: String, default: "" },
			other: { type: String, default: "" },
		},
		grade: {
			type: Number,
			enum: [9, 10, 11, 12],
		},
		birthday: {
			type: Date,
			default: null,
		},
		academicInterests: [{ type: String }],
		reputation: {
			type: Number,
			default: 0,
		},
		stats: {
			questionsAsked: { type: Number, default: 0 },
			answersGiven: { type: Number, default: 0 },
			answersApproved: { type: Number, default: 0 },
			upvotesReceived: { type: Number, default: 0 },
			downvotesReceived: { type: Number, default: 0 },
		},
		verified: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
	},
	{ timestamps: true }
);

// Create a model from the schema
export const User = mongoose.model("User", UserSchema);

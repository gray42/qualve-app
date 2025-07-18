import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
	{
		name: { type: String, unique: true, required: true },
		slug: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		description: {
			type: String,
			default: "",
		},
		category: {
			type: String,
			enum: [
				"mathematics",
				"science",
				"english",
				"social studies",
				"standardized tests",
				"ap exams",
			],
			required: true,
		},
		usageCount: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);

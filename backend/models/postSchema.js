import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: {
			type: String,
			required: false,
		},
		body: {
			type: String,
			required: true,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
		approvedAt: {
			type: Date,
		},
		upvotes: { type: Number, default: 0 },
		downvotes: { type: Number, default: 0 },
		voters: { type: Map, of: String, default: {} },
	},
	{ timestamps: true }
);

const questionSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		username: {
			type: String,
			required: false,
		},
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: false,
		},
		tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
		upvotes: { type: Number, default: 0 },
		downvotes: { type: Number, default: 0 },
		score: { type: Number, default: 0 },
		voters: { type: Map, of: String, default: {} },
		numAnswers: {
			type: Number,
			default: 0,
		},
		answers: [answerSchema],
		views: {
			type: Number,
			default: 0,
		},
		isAnswered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// pre-calc score
questionSchema.pre("save", function (next) {
	this.score = this.upvotes - this.downvotes;
	next();
});

// Create a model from the schema
export const Post = mongoose.model("Post", questionSchema);

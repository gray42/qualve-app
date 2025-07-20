import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import { Tag } from "../models/tagSchema.js";

//get all questions
export const getPost = async (req, res) => {
	try {
		const posts = await Post.find()
			.populate("author", "username")
			.populate("tags", "name usageCount")
			.sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: "error fetching posts", error });
	}
};

//show a question (:id)
export const getPostWithId = async (req, res) => {
	try {
		const questionId = req.params.id;
		const question = await Post.findById(questionId)
			.populate("author", "username")
			.populate("tags", "name");

		if (!question) {
			return res.status(404).json({ message: "post not found" });
		}
		res.status(200).json(question);
	} catch (error) {
		res.status(500).json({ message: "server error", error });
	}
};

//post a question
export const createPost = async (req, res) => {
	const { tags } = req.body;
	try {
		const newQuestion = new Post({
			title: req.body.title,
			body: req.body.body,
			author: req.user._id,
			username: req.user.username,
			tags,
		});

		await User.findByIdAndUpdate(req.user._id, {
			$inc: { reputation: 200, "stats.questionsAsked": 1 },
		});
		const updatedUser = await User.findById(req.user._id).select("reputation");

		try {
			for (const tag of tags) {
				await Tag.updateOne({ _id: tag }, { $inc: { usageCount: 1 } });
			}
		} catch (error) {
			console.error("Error updating tag count", error);
		}

		await newQuestion.save();
		res
			.status(201)
			.json({ newQuestion, updatedReputation: updatedUser.reputation });
	} catch (error) {
		console.error("Error during post-question:", error);
		res.status(500).json({ message: error.message });
	}
};

export const getPostsByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		const posts = await Post.find({ author: userId })
			.populate("author", "username")
			.populate("tags", "name")
			.sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching posts by user:", error);
		res.status(500).json({ message: "Failed to fetch user posts" });
	}
};

export const getHotPosts = async (req, res) => {
	try {
		const hotPosts = await Post.find({ upvotes: { $gte: 1 } })
			.populate("tags", "name") // Only posts with at least 1 upvote
			.sort({ score: -1, createdAt: -1 })
			.limit(5);

		res.json(hotPosts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch hot posts" });
	}
};

export const isAnswered = async (req, res) => {
	const { postId } = req.params;
	const userId = req.user._id;

	try {
		const post = await Post.findById(postId);
		if (!post) return res.status(404).json({ message: "Post not found" });

		// only user who posted can update status
		if (post.author.toString() !== userId.toString()) {
			return res
				.status(403)
				.json({ message: "Not authorized to update this post" });
		}
		post.isAnswered = !post.isAnswered;

		const updatedPost = await post.save();

		res.json({
			message: "Post status updated successfully",
			post: updatedPost,
		});
	} catch (error) {
		res.status(500).json({
			message: "Only the owner of this question can update its status.",
		});
	}
};

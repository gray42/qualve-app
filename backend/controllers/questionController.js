import { Post } from "../models/postSchema.js";

//get all questions
export const getPost = async (req, res) => {
	try {
		const posts = await Post.find()
			.populate("author", "username")
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
		const question = await Post.findById(questionId).populate(
			"author",
			"username"
		);

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
			title: req.body.question,
			author: req.user._id,
			username: req.user.username,
			tags,
		});
		await newQuestion.save();
		res.status(201).json(newQuestion);
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
			.sort({ createdAt: -1 });
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching posts by user:", error);
		res.status(500).json({ message: "Failed to fetch user posts" });
	}
};

export const getHotPosts = async (req, res) => {
	try {
		const hotPosts = await Post.find()
			.sort({ upvotes: -1, createdAt: -1 }) // Most upvoted & recent
			.limit(5); // Top 5 hot posts

		res.json(hotPosts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to fetch hot posts" });
	}
};

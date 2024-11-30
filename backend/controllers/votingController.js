import { Post } from "../models/postSchema.js";

//PATCH /:id/vote
export const votingSystem = async (req, res) => {
	try {
		//locate associated post
		//depending on the button pressed add or subtract a vote with 0 being the floor
		//requires frontend logic
		const { action } = req.body;
		const postId = req.params.id;
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found." });
		}
		if (action === "add") {
			post.votes += 1;
		} else if (post.votes > 0 && action === "subtract") {
			post.votes -= 1;
		} else {
			return res.status(400).json("Unexpected error in voting system.");
		}
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error });
	}
};

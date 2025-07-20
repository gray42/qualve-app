import { Post } from "../models/postSchema.js";
import { User } from "../models/userSchema.js";
import { Tag } from "../models/tagSchema.js";

export const searchQ = async (req, res) => {
	const q = req.query.q || "";
	const regex = RegExp(q, "i");
	try {
		const users = await User.find({ username: regex }).limit(5);
		const posts = await Post.find({ title: regex }).limit(5);
		const tags = await Tag.find({ name: regex }).limit(5);

		res.json({
			// send results back
			users,
			posts,
			tags,
		});
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

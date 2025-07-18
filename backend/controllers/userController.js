import { User } from "../models/userSchema.js";

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find().sort({ createdAt: -1 });
		res.status(200).json({ users });
	} catch (error) {
		res.status(500).json({ message: "Error getting all users", error });
	}
};

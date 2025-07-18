import express from "express";
import {
	register,
	login,
	logout,
	updateUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { User } from "../models/userSchema.js";
import { getAllUsers } from "../controllers/userController.js";
const router = express.Router();

//register
router.post("/register", register);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);

router.put("/:id", updateUser);

//authorized pathway
router.get("/admin", authenticateToken, (req, res) => {
	res.json({
		message: "You have been granted access to the admin page.",
		user: req.user,
	});
});

router.get("/user", authenticateToken, async (req, res) => {
	const user = await User.findById(req.user._id).select("-password");
	res.json(user);
});

router.get("/all-users", getAllUsers);

router.get("/users/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

export default router;

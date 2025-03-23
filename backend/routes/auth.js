import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { User } from "../models/userSchema.js";
const router = express.Router();

//register
router.post("/register", register);
//login
router.post("/login", login);
//logout
router.post("/logout", logout);

//authorized pathway
router.get("/admin", authenticateToken, (req, res) => {
	res.json({
		message: "You have been granted access to the admin page.",
		user: req.user,
	});
});

router.get("/user", authenticateToken, async (req, res) => {
	const user = await User.findById(req.user.id).select("-password");
	res.json(user);
});

export default router;

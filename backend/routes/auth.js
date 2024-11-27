import express from "express";
import { register, login } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = express.Router();

//register
router.post("/register", register);
//login
router.post("/login", login);

//authorized pathway
router.get("/admin", authenticateToken, (req, res) => {
    res.json({message: "You have been granted access to the admin page.", user: req.user});
})

export default router;
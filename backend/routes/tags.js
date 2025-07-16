import express from "express";
import { searchTags } from "../controllers/tagController.js";
const router = express.Router();

router.get("/search", searchTags);

export default router;

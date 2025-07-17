import express from "express";
import { getTags, searchTags } from "../controllers/tagController.js";
const router = express.Router();

router.get("/search", searchTags);
router.get("/", getTags);

export default router;

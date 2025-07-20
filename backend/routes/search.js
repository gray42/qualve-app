import express from "express";
import { searchQ } from "../controllers/searchController.js";
const router = express.Router();

router.get("/", searchQ);

export default router;

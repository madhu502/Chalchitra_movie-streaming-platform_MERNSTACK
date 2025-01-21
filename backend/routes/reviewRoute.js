import express from "express";
import { addReview } from "../controllers/reviewController.js";

const router = express.Router();

// Protect routes
router.post("/reviews", addReview);

export default router;
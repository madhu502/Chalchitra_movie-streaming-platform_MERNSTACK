import { Review } from "../models/reviewModel.js";
import { User } from "../models/userModel.js";

export async function addReview(req, res) {
  try {
    const { content, rating } = req.body;

    // Validate the request body
    if (!content || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Content and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Fetch the user to associate with the review
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create and save the new review
    const newReview = new Review({
      content,
      rating,
      user: userId,
      username: user.username,
    });

    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error in addReview controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

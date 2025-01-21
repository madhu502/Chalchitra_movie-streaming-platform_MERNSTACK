import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(1); // Default rating is 1
  const [hoverRating, setHoverRating] = useState(0); // Hover state for stars
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/v1/review/reviews");
        setReviews(res.data.reviews);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || "Guest");

    fetchReviews();
  }, []);

  // Submit a new review
  const handleAddReview = async () => {
    if (newReview.trim() === "") {
      alert("Review cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/review/reviews",
        { content: newReview, rating }, // Pass rating to the backend
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        setReviews([...reviews, res.data.review]);
        setNewReview("");
        setRating(1); // Reset rating to default
        toast.success("Review added successfully!");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-bold mb-6">User Reviews</h1>

          {/* Review Input Section */}
          <div className="bg-gray-800 p-6 rounded mb-8">
            <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-4 rounded bg-gray-900 text-white border border-gray-700 focus:ring focus:ring-orange-500 focus:outline-none mb-4"
              rows="4"
            ></textarea>

            {/* Clickable Stars for Rating */}
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={star <= (hoverRating || rating) ? "orange" : "gray"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.25l-6.9 4.052a.75.75 0 01-1.095-.79l1.89-7.823L.825 8.666a.75.75 0 01.42-1.307l8.235-.715L12 .5l2.52 6.144 8.235.715a.75.75 0 01.42 1.307l-5.07 4.373 1.89 7.823a.75.75 0 01-1.095.79L12 17.25z"
                  />
                </svg>
              ))}
              <span className="ml-2 text-gray-300">
                {rating} Star{rating > 1 ? "s" : ""}
              </span>
            </div>

            <button
              onClick={handleAddReview}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600"
            >
              Submit Review
            </button>
          </div>

          {/* Reviews List */}
          {loading ? (
            <p className="text-gray-400 text-center">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-800 p-4 rounded relative"
                >
                  <p className="text-orange-500 font-bold mb-2">
                    {review.username}
                  </p>
                  <p className="text-gray-300 mb-2">{review.content}</p>
                  <p className="text-yellow-400">
                    {"⭐".repeat(review.rating)}{" "}
                    <span className="text-gray-400">
                      ({review.rating} Star{review.rating > 1 ? "s" : ""})
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No reviews yet. Be the first to add one!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;

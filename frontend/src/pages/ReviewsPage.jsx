import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [username, setUsername] = useState("");

  // Retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem("user");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername("Anonymous");
    }
  }, []);

  const handleAddReview = () => {
    if (newReview.trim() === "") {
      alert("Review cannot be empty!");
      return;
    }

    // Add the new review to the reviews list
    setReviews([
      ...reviews,
      { id: Date.now(), username: username, content: newReview },
    ]);
    setNewReview(""); // Clear the input field
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {/* Main Content */}
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
            <button
              onClick={handleAddReview}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600"
            >
              Submit Review
            </button>
          </div>

          {/* Reviews List */}
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800 p-4 rounded relative"
                >
                  <p className="text-orange-500 font-bold mb-2">
                    {review.username}
                  </p>
                  <p className="text-gray-300">{review.content}</p>
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

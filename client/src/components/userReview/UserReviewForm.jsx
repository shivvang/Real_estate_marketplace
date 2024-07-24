/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserReviewForm = ({ propertyId, userId, onReviewSubmitted }) => {
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        const response = await fetch("/api/userReview/postReview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewText,
            userId,
            propertyId,
          }),
        });
        if (!response.ok) {
          toast.error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          toast.success("Your review has been posted successfully!");
          if (onReviewSubmitted) onReviewSubmitted(); // Update reviews list
        } else {
          toast.error("Failed to post your review. Please try again.");
        }
      } catch (error) {
        console.error("Error posting review:", error);
        toast.error("An error occurred while posting your review.");
      } finally {
        setLoading(false);
        setReviewText("");
      }
    },
    [reviewText, userId, propertyId, onReviewSubmitted]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6"
    >
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Leave a Review
      </h2>
      <textarea
        className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review..."
        disabled={loading} // Disable the textarea while loading
      />
      <button
        type="submit"
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-md"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
      <ToastContainer />
    </form>
  );
};

export default UserReviewForm;

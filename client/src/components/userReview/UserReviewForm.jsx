/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const UserReviewForm = ({ propertyId, userId }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting review:", error);
    }

    setReviewText("");
  };
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
      />
      <button
        type="submit"
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default UserReviewForm;

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

const UserReviewList = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/userReview/getReview/${propertyId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.comments);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [propertyId]);
  console.log("humka dekhna padega", reviews);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        User Reviews
      </h2>
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-700 py-3">
            <p className="text-white">{review.commentText}</p>
            <p className="text-gray-500 text-sm">
              Reviewed by: {review.userId.userName}
            </p>
            <p className="text-gray-400 text-xs">
              {new Date(review.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
    </div>
  );
};

export default UserReviewList;

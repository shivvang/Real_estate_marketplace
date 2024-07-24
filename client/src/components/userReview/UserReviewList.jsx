/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { format } from "date-fns";

const UserReviewList = ({ reviews }) => {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="p-4 bg-gray-900 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-white">
                  {review.userId.userName}
                </span>
                <span className="text-gray-500 text-sm">
                  {format(new Date(review.timestamp), "PPP p")}
                </span>
              </div>
              <p className="text-gray-300">{review.commentText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReviewList;

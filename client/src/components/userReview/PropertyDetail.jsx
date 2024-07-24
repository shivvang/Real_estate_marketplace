/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from "react";
import UserReviewForm from "./UserReviewForm";
import UserReviewList from "./UserReviewList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PropertyDetail = React.memo(({ propertyId, userId }) => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews when the component mounts or propertyId changes
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/userReview/getReview/${propertyId}`);
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        if (data.success === false) toast.error("coudnt find anything");
        setReviews(data.comments);
      } catch (error) {
        toast.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [propertyId]);

  // Function to update reviews list
  const updateReviews = useCallback(async () => {
    try {
      const response = await fetch(`/api/userReview/getReview/${propertyId}`);
      if (!response.ok) toast.error("Failed to fetch reviews");
      const data = await response.json();
      if (data.success === false) toast.error("couldnt find any thing ");

      setReviews(data.comments);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [propertyId]);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4 text-gray-200 text-center">
        Property Reviews
      </h1>
      <UserReviewForm
        propertyId={propertyId}
        userId={userId}
        onReviewSubmitted={updateReviews}
      />
      <UserReviewList propertyId={propertyId} reviews={reviews} />
    </div>
  );
});
PropertyDetail.displayName = "PropertyDetail";
export default PropertyDetail;

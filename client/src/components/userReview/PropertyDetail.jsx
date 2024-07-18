/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from "react";
import UserReviewForm from "./UserReviewForm";
import UserReviewList from "./UserReviewList";

const PropertyDetail = ({ propertyId, userId }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-200 text-center">
        Property Reviews
      </h1>
      <UserReviewForm propertyId={propertyId} userId={userId} />
      <UserReviewList propertyId={propertyId} />
    </div>
  );
};

export default PropertyDetail;

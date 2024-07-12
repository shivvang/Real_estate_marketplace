/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
function PropertyCard({ propertyData }) {
  const isResidentialOrCommercial = ["residential", "commercial"].includes(
    propertyData.propertyType
  );
  const isRawLand = propertyData.propertyType === "rawLand";
  return (
    <div className="bg-gray-800 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/propertyView/${propertyData._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
          src={propertyData.propertyImageUrls[0]}
          alt="cover image"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-white">
          {propertyData.propertyTitle}
        </p>
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-blue-500" />
          <p className="text-sm text-gray-400 truncate">
            {propertyData.location}
          </p>
        </div>
        <p className="text-sm text-gray-400 line-clamp-2">
          {propertyData.description}
        </p>
        <p className="text-blue-500 mt-2 font-semibold">
          ${propertyData.priceBreakUp.toLocaleString("en-US")}
          {propertyData.transactionType === "rent" && "/Month"}
        </p>
        {isResidentialOrCommercial && (
          <div className="text-gray-400 flex gap-4">
            <div className="font-bold text-xs">
              {propertyData.beds > 1
                ? `${propertyData.beds} beds`
                : `${propertyData.beds} bed`}
            </div>
            <div className="font-bold text-xs">
              {propertyData.baths > 1
                ? `${propertyData.baths} baths`
                : `${propertyData.baths} bath`}
            </div>
          </div>
        )}
        {isRawLand && (
          <div className="text-gray-400">
            <p className="font-bold text-xs">Raw Land</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyCard;

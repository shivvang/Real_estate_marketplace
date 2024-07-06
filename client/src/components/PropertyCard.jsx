import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
function PropertyCard({ propertyData }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/propertyView/${propertyData._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={propertyData.propertyImageUrls[0]}
          alt="cover image which should have been here"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700">
          {propertyData.name}
        </p>
        <div className="flex items-center gap-1">
          <MdLocationOn className="h-4 w-4 text-green-700" />
          <p className="text-sm text-gray-600 truncate">
            {propertyData.address}
          </p>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {propertyData.description}
        </p>
        <p className="text-slate-500 mt-2 font-semibold">
          ${propertyData.priceBreakUp.toLocaleString("en-US")}
          {propertyData.propertyType === "rent" && "/Month"}
        </p>
        <div className="text-slate-700 flex gap-4">
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
      </div>
    </div>
  );
}

export default PropertyCard;

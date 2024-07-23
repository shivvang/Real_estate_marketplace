// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Swipercore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

import "swiper/css/bundle";
import { useSelector } from "react-redux";
import ContactOwner from "../components/ContactOwner";
import PropertyDetail from "../components/userReview/PropertyDetail";

function PropertyView() {
  Swipercore.use([Navigation]);
  const [propertyData, setPropertydata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/propertyListing/getProperty/${params.propertyId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(error.message);
          return;
        }
        setPropertydata(data);
        setLoading(false);
        setError(false);
        if (currentUser && data._id) {
          await fetch("/api/LastVisitedProperty/logVisited", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser._id,
              propertyId: data._id,
            }),
          });
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.propertyId, currentUser]);

  const getTransactionTypeLabel = (transactionType) => {
    switch (transactionType) {
      case "rent":
        return "Available for Rent";
      case "sell":
        return "Available for Sale";
      case "pg":
        return "Paying Guest Accommodation";
      default:
        return "Property";
    }
  };

  const formatPriceInINR = (amount) => {
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹ ${amount.toLocaleString("en-IN")}`;
    }
  };

  return (
    <main>
      {loading && (
        <p className="text-center my-7 text-2xl text-gray-300">Loading...</p>
      )}
      {error && (
        <p className="text-center my-7 text-2xl text-red-500">{error}</p>
      )}
      {propertyData && !loading && !error && (
        <div>
          <Swiper navigation>
            {propertyData.propertyImageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[300px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer shadow-lg">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow-lg">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-6 my-7 gap-6 bg-gray-800 rounded-lg shadow-lg">
            <p className="text-3xl font-bold text-white">
              {propertyData.propertyTitle} - Starting From{" "}
              {formatPriceInINR(propertyData.priceBreakUp)}
              {(propertyData.transactionType === "rent" ||
                propertyData.transactionType === "pg") &&
                " / month"}
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <FaMapMarkerAlt className="text-gray-500" />
              {propertyData.location}
            </p>
            <div>
              <p className="bg-blue-600 w-full max-w-[200px] text-white text-center p-2 rounded-md shadow-md">
                {getTransactionTypeLabel(propertyData.transactionType)}
              </p>
            </div>
            <p className="text-gray-300">
              <strong>Description:</strong> {propertyData.description}
            </p>
            <ul className="text-green-500 font-semibold flex flex-wrap items-center gap-4">
              <li className="flex items-center gap-1">
                <FaBed className="text-lg text-gray-400" />
                {propertyData.beds > 1
                  ? `${propertyData.beds} beds`
                  : `${propertyData.beds} bed`}
              </li>
              <li className="flex items-center gap-1">
                <FaBath className="text-lg text-gray-400" />
                {propertyData.baths > 1
                  ? `${propertyData.baths} baths`
                  : `${propertyData.baths} bath`}
              </li>
              {propertyData.addAreaDetails.parking && (
                <li className="flex items-center gap-1">
                  <FaParking className="text-lg text-gray-400" />
                  Parking
                </li>
              )}
              {propertyData.addAreaDetails.furnished && (
                <li className="flex items-center gap-1">
                  <FaChair className="text-lg text-gray-400" />
                  Furnished
                </li>
              )}
              {propertyData.addAreaDetails.balcony && (
                <li className="flex items-center gap-1">Balcony</li>
              )}
            </ul>
            <div>
              <p className="text-gray-300">
                <strong>Amenities:</strong>
              </p>
              <ul className="text-gray-300 flex flex-wrap items-center gap-2">
                {propertyData.amenities.powerBackup && (
                  <li className="bg-gray-700 p-2 rounded-md">Power Backup</li>
                )}
                {propertyData.amenities.lift && (
                  <li className="bg-gray-700 p-2 rounded-md">Lift</li>
                )}
                {propertyData.amenities.security && (
                  <li className="bg-gray-700 p-2 rounded-md">Security</li>
                )}
                {propertyData.amenities.waterSupply && (
                  <li className="bg-gray-700 p-2 rounded-md">Water Supply</li>
                )}
                {propertyData.amenities.gymnasium && (
                  <li className="bg-gray-700 p-2 rounded-md">Gymnasium</li>
                )}
                {propertyData.amenities.swimmingPool && (
                  <li className="bg-gray-700 p-2 rounded-md">Swimming Pool</li>
                )}
                {propertyData.amenities.clubhouse && (
                  <li className="bg-gray-700 p-2 rounded-md">Clubhouse</li>
                )}
                {propertyData.amenities.garden && (
                  <li className="bg-gray-700 p-2 rounded-md">Garden</li>
                )}
              </ul>
            </div>
            <p className="text-gray-300">
              <strong>Location Advantage:</strong> {propertyData.landmark}
            </p>
            <p className="text-gray-300">
              <strong>Carpet Area:</strong> {propertyData.carpetArea} sq ft
            </p>
            {propertyData.maintenanceCharge > 0 && (
              <p className="text-gray-300">
                <strong>Maintenance Charge:</strong> - ₹
                {propertyData.maintenanceCharge}
                {(propertyData.transactionType === "rent" ||
                  propertyData.transactionType === "pg") &&
                  " / month"}
              </p>
            )}
            {propertyData.accommodationDuration > 0 && (
              <p className="text-gray-300">
                <strong>Accommodation Duration:</strong> -{" "}
                {propertyData.accommodationDuration} months
              </p>
            )}
            {propertyData.priceDetails.isNegotiable && (
              <p className="text-gray-300">
                <strong>Price is negotiable</strong>
              </p>
            )}
            {propertyData.priceDetails.additionalCharges && (
              <p className="text-gray-300">
                <strong>Additional charges may apply</strong>
              </p>
            )}
            {currentUser &&
              propertyData.userRefs !== currentUser._id &&
              !contactOwner && (
                <button
                  onClick={() => setContactOwner(true)}
                  className="bg-blue-600 text-white rounded-lg uppercase hover:opacity-95 p-3 mt-4"
                >
                  Contact Owner
                </button>
              )}
            {contactOwner && <ContactOwner propertyData={propertyData} />}
          </div>
        </div>
      )}

      {propertyData && (
        <PropertyDetail
          propertyId={propertyData._id}
          userId={currentUser._id}
        />
      )}
    </main>
  );
}

export default PropertyView;

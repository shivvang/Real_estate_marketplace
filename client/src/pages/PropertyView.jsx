// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import ContactOwner from "../components/ContactOwner";
import PropertyDetail from "../components/userReview/PropertyDetail";
import Loading from "../components/Loading";

function PropertyView() {
  Swipercore.use([Navigation]);
  const [propertyData, setPropertydata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/propertyListing/getProperty/${params.propertyId}`
      );
      const data = await res.json();

      if (data.success === false) {
        throw new Error(data.message);
      }

      setPropertydata(data);

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
      toast.error("Failed to fetch property data.");
    } finally {
      setLoading(false);
    }
  }, [params.propertyId, currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getTransactionTypeLabel = useCallback((transactionType) => {
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
  }, []);

  const formatPriceInINR = useCallback((amount) => {
    if (amount >= 10000000) {
      return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹ ${(amount / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹ ${amount.toLocaleString("en-IN")}`;
    }
  }, []);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const amenities = useMemo(() => {
    return [
      { name: "Power Backup", value: propertyData?.amenities?.powerBackup },
      { name: "Lift", value: propertyData?.amenities?.lift },
      { name: "Security", value: propertyData?.amenities?.security },
      { name: "Water Supply", value: propertyData?.amenities?.waterSupply },
      { name: "Gymnasium", value: propertyData?.amenities?.gymnasium },
      { name: "Swimming Pool", value: propertyData?.amenities?.swimmingPool },
      { name: "Clubhouse", value: propertyData?.amenities?.clubhouse },
      { name: "Garden", value: propertyData?.amenities?.garden },
    ].filter((amenity) => amenity.value);
  }, [propertyData]);

  if (loading) {
    return <Loading />;
  }

  if (!propertyData) {
    return null;
  }

  return (
    <main>
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
          <FaShare className="text-slate-500" onClick={handleShare} />
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
              {amenities.map((amenity) => (
                <li key={amenity.name} className="bg-gray-700 p-2 rounded-md">
                  {amenity.name}
                </li>
              ))}
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

      <PropertyDetail propertyId={propertyData._id} userId={currentUser._id} />
      <ToastContainer />
    </main>
  );
}

export default PropertyView;

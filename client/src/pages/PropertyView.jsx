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
          setError(true);
          return;
        }
        setPropertydata(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.propertyId]);
  console.log(propertyData);
  console.log(currentUser._id);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">
          Somethings just dont work out bro
        </p>
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
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            {/* the Clipboard API to copy the current page URL
            (window.location.href) to the clipboard.
            navigator.clipboard.writeText is a promise-based method that writes
            the provided text to the system clipboard. */}
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
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {propertyData.name} - ${" "}
              {propertyData.priceBreakUp.toLocaleString("en-US")}
              {propertyData.propertyType === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-gray-900" />
              {propertyData.address}
            </p>
            <div>
              <p className="bg-blue-600 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {propertyData.propertyType === "rent" ? "for rent" : "for sale"}
              </p>
            </div>
            <p className="text-slate-800">
              <strong>Description -</strong> {propertyData.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg text-gray-900" />
                {propertyData.beds > 1
                  ? `${propertyData.beds} beds`
                  : `${propertyData.beds} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg text-gray-900" />
                {propertyData.baths > 1
                  ? `${propertyData.baths} beds`
                  : `${propertyData.baths} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg text-gray-900" />
                {propertyData.parking ? "parking" : "No parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg text-gray-900" />
                {propertyData.furnished ? "furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              propertyData.userRefs !== currentUser._id &&
              !contactOwner && (
                <button
                  onClick={() => setContactOwner(true)}
                  className="bg-blue-600 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact Owner
                </button>
              )}
            {contactOwner && <ContactOwner propertyData={propertyData} />}
          </div>
        </div>
      )}
    </main>
  );
}

export default PropertyView;

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaBuilding } from "react-icons/fa";

const PropertiesPostedBy = () => {
  const navigate = useNavigate();

  const handleAdvertiserClick = (type) => {
    if (type === "owner") {
      navigate(`/search?ownershipType=ownedbyme`);
    } else {
      navigate(`/search?ownershipType=broker`);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg text-white max-w-md mx-auto shadow-lg">
      <h2 className="text-2xl mb-4 font-bold">Properties posted by</h2>
      <p className="mb-6 text-center text-lg">Choose type of advertiser</p>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div
          className="p-6 rounded-lg bg-gray-700 hover:bg-green-500 flex flex-col items-center w-full md:flex-1 cursor-pointer transition-colors duration-300 ease-in-out min-h-[150px]"
          onClick={() => handleAdvertiserClick("owner")}
        >
          <FaUserTie size={30} className="mb-2" />
          <span className="text-lg font-semibold text-center">Owner</span>
          <span className="text-sm text-center">10+ Properties</span>
        </div>
        <div
          className="p-6 rounded-lg bg-gray-700 hover:bg-yellow-500 flex flex-col items-center w-full md:flex-1 cursor-pointer transition-colors duration-300 ease-in-out min-h-[150px]"
          onClick={() => handleAdvertiserClick("dealer")}
        >
          <FaBuilding size={30} className="mb-2" />
          <span className="text-lg font-semibold text-center">Dealer</span>
          <span className="text-sm text-center">2 Properties</span>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPostedBy;

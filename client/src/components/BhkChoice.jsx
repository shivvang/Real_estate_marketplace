// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const BhkChoice = () => {
  const navigate = useNavigate();

  const handleBhkClick = (value) => {
    navigate(`/search?searchTerm=${value}bhk`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-md text-white max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <AiFillHome size={30} className="mr-2" />
        <h2 className="text-2xl">BHK choice in mind?</h2>
      </div>
      <p className="mb-6 text-center">Browse by no. of bedrooms in the house</p>
      <div className="flex space-x-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="cursor-pointer p-4 rounded-md bg-gray-700 hover:bg-blue-500 flex flex-col items-center"
            onClick={() => handleBhkClick(item)}
          >
            <AiFillHome size={24} className="mb-2" />
            <span className="text-lg">{item} BHK</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BhkChoice;

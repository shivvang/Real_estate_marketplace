// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//sort=priceBreakUp&order=desc
const BudgetChoice = () => {
  const navigate = useNavigate();
  const handleBudgetClick = (value) => {
    if (value == "affordable") navigate(`/search?sort=priceBreakUp&order=asc`);
    else navigate(`/search?sort=priceBreakUp&order=desc`);
  };
  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-md text-white max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <FaRupeeSign size={30} className="mr-2" />
        <h2 className="text-2xl">Have a budget in mind?</h2>
      </div>
      <p className="mb-6 text-center">Project options based on your budget</p>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <div
          className="p-4 rounded-md bg-gray-700 hover:bg-green-500 flex flex-col items-center w-full md:w-1/2"
          onClick={() => handleBudgetClick("affordable")}
        >
          <span className="text-lg font-semibold text-center">
            Affordable Projects
          </span>
          <span className="text-sm text-center">
            ₹ Cost-effective and budget-friendly
          </span>
        </div>
        <div
          className="p-4 rounded-md bg-gray-700 hover:bg-yellow-500 flex flex-col items-center w-full md:w-1/2"
          onClick={() => handleBudgetClick("luxury")}
        >
          <span className="text-lg font-semibold text-center">
            Luxury Projects
          </span>
          <span className="text-sm text-center">
            💸 Premium and high-end 💸
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetChoice;

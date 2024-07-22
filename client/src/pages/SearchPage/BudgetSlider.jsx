/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaRupeeSign } from "react-icons/fa";

const BudgetSlider = ({ minPrice, maxPrice, setSearchFilters }) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const formatPrice = (value) => {
    if (value === undefined) {
      console.error("Value is undefined");
      return "N/A";
    }

    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `${(value / 100000).toFixed(1)} Lakh`;
    } else {
      return `${value.toLocaleString("en-IN")} INR`;
    }
  };

  const handleSliderChange = (values) => {
    setLocalMinPrice(values[0]);
    setLocalMaxPrice(values[1]);
    setSearchFilters(values[0], values[1]);
  };

  const handleClear = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(1000000000);
    setSearchFilters(0, 1000000000);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg text-white w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">Budget</h2>
        <button className="bg-red-500 px-2 py-1 rounded" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>{formatPrice(localMinPrice)}</span>
          <span>{formatPrice(localMaxPrice)}</span>
        </div>
        <Slider
          range
          min={0}
          max={1000000000}
          step={1000000}
          value={[localMinPrice, localMaxPrice]}
          onChange={handleSliderChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Min Budget</span>
          <span className="text-lg font-semibold">
            <FaRupeeSign /> {formatPrice(localMinPrice)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Max Budget</span>
          <span className="text-lg font-semibold">
            <FaRupeeSign /> {formatPrice(localMaxPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;

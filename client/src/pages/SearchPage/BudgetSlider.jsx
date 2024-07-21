/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaRupeeSign } from "react-icons/fa";

const BudgetSlider = ({ searchFilters, setSearchFilters }) => {
  const [minPrice, setMinPrice] = useState(searchFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(searchFilters.maxPrice);

  useEffect(() => {
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: minPrice,
      maxPrice: maxPrice,
    }));
  }, [minPrice, maxPrice, setSearchFilters]);

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
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const handleClear = () => {
    setMinPrice(0);
    setMaxPrice(1000000000);
    setSearchFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: 0,
      maxPrice: 1000000000,
    }));
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
          <span>{formatPrice(minPrice)}</span>
          <span>{formatPrice(maxPrice)}</span>
        </div>
        <Slider
          range
          min={0}
          max={1000000000}
          step={1000000}
          value={[minPrice, maxPrice]}
          onChange={handleSliderChange}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Min Budget</span>
          <span className="text-lg font-semibold">
            <FaRupeeSign /> {formatPrice(minPrice)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">Max Budget</span>
          <span className="text-lg font-semibold">
            <FaRupeeSign /> {formatPrice(maxPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;

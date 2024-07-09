/* eslint-disable react/prop-types */
import React from "react";

const RadioGroup = ({ label, name, options, selectedOption, onChange }) => {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-300 mb-2">{label}</p>
      <div className="flex flex-wrap items-center gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              id={option.value}
              onChange={onChange}
              checked={selectedOption === option.value}
              className="accent-blue-600 h-5 w-5"
              disabled={option.disabled}
            />
            <label
              htmlFor={option.value}
              className={`text-gray-300 ${
                option.disabled ? "text-gray-400" : ""
              }`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

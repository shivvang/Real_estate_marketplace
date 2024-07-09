/* eslint-disable react/prop-types */
import React from "react";

const CheckboxGroup = ({ label, name, options, selectedOptions, onChange }) => {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-300 mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={option.value}
              className="accent-blue-600 h-5 w-5"
              onChange={onChange}
              checked={selectedOptions[option.value]}
              name={`${name}.${option.value}`}
            />
            <label htmlFor={option.value} className="text-gray-300">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;

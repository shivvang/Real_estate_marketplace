/* eslint-disable react/prop-types */
import React from "react";

const TextInput = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-gray-300"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;

/* eslint-disable react/prop-types */
import React from "react";

const FileInput = ({ label, name, onChange }) => {
  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-300 mb-2">{label}</p>
      <input
        type="file"
        multiple
        className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-800 text-gray-300"
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;

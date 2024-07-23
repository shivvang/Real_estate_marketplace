/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function DisplayUploadedImages({ formData, setFormData }) {
  const handleRemoveImageUploaded = (index) => {
    setFormData({
      ...formData,
      propertyImageUrls: formData.propertyImageUrls.filter(
        (_, i) => i !== index
      ),
    });
  };
  return (
    <>
      {formData.propertyImageUrls.length > 0 &&
        formData.propertyImageUrls.map((url, index) => (
          <div
            key={index}
            className="flex justify-between p-3 border border-gray-300 rounded-lg items-center mb-2 shadow-md bg-gray-800"
          >
            <img
              src={url}
              alt="property image"
              className="w-20 h-20 object-cover rounded-lg"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => handleRemoveImageUploaded(index)}
              className="p-3 text-red-700 border border-red-700 rounded-lg uppercase hover:bg-red-700 hover:text-white transition duration-200"
            >
              Delete
            </button>
          </div>
        ))}
    </>
  );
}

export default DisplayUploadedImages;

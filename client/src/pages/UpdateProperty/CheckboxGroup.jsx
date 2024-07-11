/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const CheckboxGroup = ({ label, name, options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (optionValue, isChecked) => {
    onChange({
      target: {
        name: `${name}.${optionValue}`,
        value: isChecked,
        type: "checkbox",
      },
    });
  };

  return (
    <div className="mb-4">
      <p className="block text-sm font-medium text-gray-300 mb-2">{label}</p>
      <div className="flex flex-wrap items-center gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              name={`${name}.${option.value}`}
              id={`${name}.${option.value}`}
              onChange={(e) =>
                handleCheckboxChange(option.value, e.target.checked)
              }
              checked={!!selectedOptions[option.value]} // Ensure checked is always defined
              className="accent-blue-600 h-5 w-5"
              disabled={option.disabled}
            />
            <label
              htmlFor={`${name}.${option.value}`}
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

export default CheckboxGroup;

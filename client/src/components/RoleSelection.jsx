/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const RoleSelection = ({ handleRoleChange, selectedRole, uniqueKey }) => {
  return (
    <div className="flex justify-center gap-4 text-white">
      {["buyer", "seller", "tenant"].map((role) => (
        <label key={role} className="flex items-center">
          <input
            type="radio"
            name={`role-${uniqueKey}`}
            value={role}
            onChange={handleRoleChange}
            checked={selectedRole === role}
            className="mr-2 accent-blue-500"
            aria-label={role.charAt(0).toUpperCase() + role.slice(1)}
          />
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default RoleSelection;

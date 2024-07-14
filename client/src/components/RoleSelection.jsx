/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const RoleSelection = ({ handleRoleChange, selectedRole }) => {
  return (
    <div className="flex justify-center gap-4 text-white">
      {["buyer", "seller", "tenant"].map((role) => (
        <label key={role} className="flex items-center">
          <input
            type="radio"
            name="role"
            value={role}
            onChange={handleRoleChange}
            checked={selectedRole === role}
            className="mr-2 accent-blue-500"
          />
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </label>
      ))}
    </div>
  );
};

export default RoleSelection;

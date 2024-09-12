/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);

  // Redirect to /signin if the user is not authenticated
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  // Redirect to home if the user doesn't have the allowed role
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  // Render child routes if everything is fine
  return <Outlet />;
}

export default PrivateRoute;

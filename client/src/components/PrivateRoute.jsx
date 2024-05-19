import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  //outlet renders children rout if any exist
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

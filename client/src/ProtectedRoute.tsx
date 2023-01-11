import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AppState } from "./AppContext";

const ProtectedRoute = () => {
  const { token } = useContext(AppState);

  return token ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;

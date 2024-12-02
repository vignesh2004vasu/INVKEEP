import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./components/UserContext"; // Adjust the path as needed

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;

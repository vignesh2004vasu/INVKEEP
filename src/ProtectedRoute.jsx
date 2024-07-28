import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './components/UserContext'; // Adjust the path as needed

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;

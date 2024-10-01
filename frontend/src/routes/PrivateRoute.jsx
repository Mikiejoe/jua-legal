import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { login,isAuthenticated } = useAuth();

  const user = localStorage.getItem("user")
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
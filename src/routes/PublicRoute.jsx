import React from "react";
import { useAuth } from '../context/authContext';

import { Navigate } from 'react-router-dom';
function PublicRoute({children}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/home"/> : children;
}

export default PublicRoute;
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute checks if the user is authenticated
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token found, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
}

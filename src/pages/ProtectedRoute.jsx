import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminUser } from '../api/firebase';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const uid = localStorage.getItem('user');
  if (!uid || (requireAdmin && !isAdminUser(uid))) {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;

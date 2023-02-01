import React from 'react';
import { useAuthContext } from '../components/context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuthContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    alert('잘못된 접근입니다');
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;

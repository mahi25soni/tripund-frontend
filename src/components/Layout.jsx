import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const noLayoutPaths = ['/Signup', '/login', '/createStore', '/forgot-password'];

  const isDynamicResetPasswordPath = location.pathname.startsWith('/reset-password/');

  const shouldRenderLayout = !noLayoutPaths.includes(location.pathname) && !isDynamicResetPasswordPath; 
  
  return shouldRenderLayout ? <DashboardLayout>{children}</DashboardLayout> : <>{children}</>;
};

export default Layout;

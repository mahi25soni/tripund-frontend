import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const Layout = ({ children }) => {
  const location = useLocation();

  // List of paths that should not have the DashboardLayout
  const noLayoutPaths = ['/signup', '/login', '/createStore'];

  // Check if the current path is in the noLayoutPaths array
  const shouldRenderLayout = !noLayoutPaths.includes(location.pathname);

  return shouldRenderLayout ? <DashboardLayout>{children}</DashboardLayout> : <>{children}</>;
};

export default Layout;

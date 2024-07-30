import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const noLayoutPaths = ['/Signup', '/login', '/createStore'];

  const shouldRenderLayout = !noLayoutPaths.includes(location.pathname);
  
  return shouldRenderLayout ? <DashboardLayout>{children}</DashboardLayout> : <>{children}</>;

};

export default Layout;

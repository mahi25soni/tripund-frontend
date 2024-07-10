import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full ml-64">
        <TopBar />
        <div className="mt-16 p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';
import BottomBar from './BottomBar';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className={`w-full mb-16 md:mb-0 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64 md:ml-0 md:w-full' : 'ml-0'
        }`}
      >
        <TopBar onToggleSidebar={toggleSidebar} />
        <div className="mt-16 p-6 bg-gray-100 min-h-screen relative">
          {children}
        </div>
      </div>

      <BottomBar/>
    </div>
  );
};

export default DashboardLayout;

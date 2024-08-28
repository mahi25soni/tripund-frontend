import React from 'react';
import TopBar from './components/Topbar';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="p-10">
          <h1>Main Content Area</h1>
          <p>This is where your main content will go.</p>
        </div>
      </div>
    </div>
  );
};

export default App;

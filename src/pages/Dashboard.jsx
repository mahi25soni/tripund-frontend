import React from 'react';
import axios from 'axios';

import DashboardLayout from '../components/DashboardLayout';


const token = localStorage.getItem('token');
const Dashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
    </DashboardLayout>
  );
};

export default Dashboard;

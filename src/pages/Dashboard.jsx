import React from 'react';
import axios from 'axios';
import DashbComp from '../components/DashbComp';
import DashboardLayout from '../components/DashboardLayout';
import PurchaseComp from '../components/PurchaseComp';
// import QRCodeGenerator from '../components/QRCodeGenerator';


const token = localStorage.getItem('token');

const Dashboard = () => {
  return (
   <div>
      <DashbComp/>
      <PurchaseComp/>
      
      {/* <QRCodeGenerator/> */}
   
    </div>
  );
};

export default Dashboard;

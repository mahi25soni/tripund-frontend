import React from 'react';
import axios from 'axios';
import DashbComp from '../components/DashbComp';
import DashboardLayout from '../components/DashboardLayout';
import PurchaseComp from '../components/PurchaseComp';
import DashboardContent from '../components/DashboardContent';
import OrderDetails from './Order/OrderDetails';
// import QRCodeGenerator from '../components/QRCodeGenerator';


const token = localStorage.getItem('token');

const Dashboard = () => {
  return (
   <div>
      {/* <DashbComp/>
      <PurchaseComp/> */}
      <DashboardContent/>
      {/* <OrderDetails/> */}
      {/* <QRCodeGenerator/> */}
   
    </div>
  );
};

export default Dashboard;

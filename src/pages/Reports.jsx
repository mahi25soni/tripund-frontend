import React from 'react';
import axios from 'axios';
import DashbComp from '../components/DashbComp';
import PurchaseComp from '../components/PurchaseComp';
import SaleVisual from '../components/SaleVisual';
// import QRCodeGenerator from '../components/QRCodeGenerator';


const token = localStorage.getItem('token');

const Reports = () => {
  return (
   <div>
      <SaleVisual/>
      
      {/* <QRCodeGenerator/> */}
   
    </div>
  );
};

export default Reports;

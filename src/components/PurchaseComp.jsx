import React from 'react';
import { FaDollarSign, FaChartLine, FaChartPie, FaMoneyBillAlt } from "react-icons/fa";
import { BsPersonUp,BsBoxSeam } from "react-icons/bs";
import { BiSolidWidget } from "react-icons/bi";
import { BsTag } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
// import QRCode from 'react-qr-code';
// import QRCodeGenerator from './QRCodeGenerator';


const PurchaseComp = () => {
  return (
    <div className="flex h-screen">
      {/* Left Column - 70% */}

      <div className="w-7/10  ">

      <div className='bg-white p-4 h-fit'>
      <h3 className='text-2xl font-medium p-2 pb-4'>Purchase Overview</h3>
        <div className='flex'>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-sky-200 p-4 rounded mr-4">
            <BsTag className="text-xl text-sky-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg  text-gray-700 leading-none">Purchase</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 10,000,00</span>
          </div>
        </div>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-violet-200 p-4 rounded mr-4">
            <TbTruckReturn className="text-xl text-violet-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg text-gray-700 leading-none">Return</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">25</span>
          </div>        
          </div>
          
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-pink-200 p-4 rounded mr-4">
            <RiRefund2Line className="text-xl text-pink-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg text-gray-700 leading-none">Refund</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div> 
        </div>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-red-200 p-4 rounded mr-4">
            <FaMoneyBillAlt className="text-xl text-red-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg text-gray-700 leading-none">Cost</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div> 
        </div>
        </div>
      </div>
      </div>

      {/* Right Column - 30% */}
      <div className="w-3/10 ml-4">
        <div className='bg-white w-full p-4'>
        <h3 className='text-2xl font-medium p-2 pb-4'>Product Overview</h3>
        <div className='flex'>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-blue-200 p-4 rounded mr-6">
            <BsBoxSeam className="text-xl text-blue-600" />
          </div>
          <div className='flex flex-col w-28 '>
          <span className="text-lg  text-gray-700 leading-none">Supplier</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">200</span>
          </div>
        </div>

        <div className="flex items-center mb-6 ">
          <div className="bg-green-200 p-4 rounded mr-2">
            <BiSolidWidget className="text-xl text-green-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg  text-gray-700 leading-none">Category</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseComp;

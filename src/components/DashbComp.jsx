import React from 'react';
import { FaDollarSign, FaChartLine, FaChartPie, FaMoneyBillAlt } from "react-icons/fa";
import { BsPersonUp,BsBoxSeam } from "react-icons/bs";
import { BiSolidWidget } from "react-icons/bi";


const DashbComp = () => {
  return (
    <div className="flex mb-4">
      {/* Left Column - 70% */}

      <div className="w-7/10  ">

      <div className='bg-white p-4 h-fit'>
      <h3 className='text-2xl font-medium p-2 pb-4'>Sales Overview</h3>
        <div className='flex'>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-green-200 p-4 rounded mr-4">
            <FaDollarSign className="text-xl text-green-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg  text-gray-700 leading-none">Sales</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div>
        </div>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-yellow-200 p-4 rounded mr-4">
            <FaChartLine className="text-xl text-yellow-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg text-gray-700 leading-none">Profit</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div>        
          </div>
          
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-indigo-200 p-4 rounded mr-4">
            <FaChartPie className="text-xl text-indigo-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg text-gray-700 leading-none">Revenue</span>
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
        <h3 className='text-2xl font-medium p-2 pb-4'>Inventory Overview</h3>
        <div className='flex'>
        <div className="flex items-center mb-6 mr-2">
          <div className="bg-blue-200 p-4 rounded mr-6">
            <BsBoxSeam className="text-xl text-blue-600" />
          </div>
          <div className='flex flex-col w-28 '>
          <span className="text-lg  text-gray-700 leading-none">In hand</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">200</span>
          </div>
        </div>

        <div className="flex items-center mb-6 ">
          <div className="bg-green-200 p-4 rounded mr-2">
            <BiSolidWidget className="text-xl text-green-600" />
          </div>
          <div className='flex flex-col w-28'>
          <span className="text-lg  text-gray-700 leading-none">To Recieve</span>
          <span className="text-lg font-semibold text-gray-700 leading-1">Rs 80,00</span>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashbComp;

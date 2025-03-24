import React from "react";

export const OverallOrders = ({ orderCounts }) => {
  return (
    <div className="bg-white p-4 mb-2 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Total Orders Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Total Orders</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-blue-500">{orderCounts?.totalOrders || 0}</p>
          </div>
        </div>

        {/* Total Pending Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Total Pending</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-yellow-500">{orderCounts?.pending || 0}</p>
          </div>
        </div>

        {/* Total Packing Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-violet-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Total Packing</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-violet-500">{orderCounts?.packing || 0}</p>
          </div>
        </div>

        {/* Out for Delivery Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Out for Delivery</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-green-500">{orderCounts?.outForDelivery || 0}</p>
          </div>
        </div>

        {/* Cancelled Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Cancelled</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-red-500">{orderCounts?.cancelled || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
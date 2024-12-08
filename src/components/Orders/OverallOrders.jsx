import React from 'react';

export const OverallOrders = ({ orderCounts }) => {
  return (
    <div className="bg-white p-4 mb-2 rounded-lg flex-none shadow">
      <div className="flex justify-between">
        <div className="w-1/2 px-10 py-3">
          <div className="font-semibold text-blue-500 mb-2 text-lg">Total Orders</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts?.totalOrders || 0}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-yellow-500 mb-2 text-lg">Total Pending</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts?.pending || 0}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-violet-500 mb-2 text-lg">Total Packing</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts?.packing || 0}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-green-500 mb-2 text-lg">Out For Delivery</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts?.outForDelivery || 0}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-red-500 mb-2 text-lg">Cancelled</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts?.cancelled || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

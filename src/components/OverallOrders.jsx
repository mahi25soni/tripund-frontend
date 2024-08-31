import React, { useState, useEffect } from 'react';
import axios from '../../axios';

export const OverallOrders = () => {
  const [orderCounts, setOrderCounts] = useState({
    totalOrders: 0,
    pending: 0,
    packing: 0,
    outForDelivery: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchOrderCounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/orders/status-counts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrderCounts(response.data.data);
        } else {
          console.error('Failed to fetch order counts:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching order counts:', error);
      }
    };

    fetchOrderCounts();
    
    // Optional: Polling to refresh data periodically
    const intervalId = setInterval(fetchOrderCounts, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="bg-white p-4 mb-2 rounded-lg flex-none shadow">
      <div className="flex justify-between">
        <div className="w-1/2 px-10 py-3">
          <div className="font-semibold text-blue-500 mb-2 text-lg">Total Orders</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-yellow-500 mb-2 text-lg">Total Pending</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts.pending}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-violet-500 mb-2 text-lg">Total Packing</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts.packing}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-green-500 mb-2 text-lg">Out For Delivery</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts.outForDelivery}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-red-500 mb-2 text-lg">Cancelled</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-lg">{orderCounts.cancelled}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

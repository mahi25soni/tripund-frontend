import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const DashboardContent = () => {
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Ordered',
        data: [1000, 2000, 1500, 3000, 2500, 3500],
        fill: false,
        borderColor: '#FFCE56',
        backgroundColor: '#FFCE56',
      },
      {
        label: 'Delivered',
        data: [900, 1800, 1400, 2800, 2300, 3300],
        fill: false,
        borderColor: '#36A2EB',
        backgroundColor: '#36A2EB',
      },
    ],
  };

  const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Purchase',
        data: [40000, 50000, 30000, 45000, 55000, 60000],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Sales',
        data: [35000, 48000, 29000, 42000, 50000, 58000],
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const summarySections = [
    {
      title: 'Sales Overview',
      items: [
        { title: 'Sales', value: '₹ 832', icon: '💰', iconClass: 'bg-blue-100 text-blue-600' },
        { title: 'Revenue', value: '₹ 18,300', icon: '📈', iconClass: 'bg-purple-100 text-purple-600' },
        { title: 'Profit', value: '₹ 868', icon: '📊', iconClass: 'bg-orange-100 text-orange-600' },
        { title: 'Cost', value: '₹ 17,432', icon: '💸', iconClass: 'bg-green-100 text-green-600' },
      ],
    },
    {
      title: 'Inventory Summary',
      items: [
        { title: 'Quantity in Hand', value: '868', icon: '📦', iconClass: 'bg-yellow-100 text-yellow-600' },
        { title: 'To be received', value: '200', icon: '📥', iconClass: 'bg-pink-100 text-pink-600' },
      ],
    },
    {
      title: 'Purchase Overview',
      items: [
        { title: 'Purchase', value: '82', icon: '🛒', iconClass: 'bg-indigo-100 text-indigo-600' },
        { title: 'Cost', value: '₹ 13,573', icon: '💵', iconClass: 'bg-teal-100 text-teal-600' },
        { title: 'Cancel', value: '5', icon: '❌', iconClass: 'bg-red-100 text-red-600' },
        { title: 'Return', value: '₹ 17,432', icon: '🔄', iconClass: 'bg-gray-100 text-gray-600' },
      ],
    },
    {
      title: 'Product Summary',
      items: [
        { title: 'Number of Suppliers', value: '31', icon: '🏭', iconClass: 'bg-lime-100 text-lime-600' },
        { title: 'Number of Categories', value: '21', icon: '📋', iconClass: 'bg-amber-100 text-amber-600' },
      ],
    },
  ];

  const topSellingStock = [
    { name: 'Rotavator', sold: 30, remaining: 12, price: '₹ 100' },
    { name: 'Farm Cultivator', sold: 21, remaining: 15, price: '₹ 207' },
    { name: 'Tractor Forging Parts', sold: 19, remaining: 17, price: '₹ 105' },
  ];

  const lowQuantityStock = [
    { name: 'Rotavator', remaining: '10 Packet', status: 'Low', image: '/path/to/tata_salt_image' },
    { name: 'Cultivator', remaining: '15 Packet', status: 'Low', image: '/path/to/lays_image' },
    { name: 'Parts', remaining: '15 Packet', status: 'Low', image: '/path/to/lays_image' },
  ];

  return (
    <div className="p-2 overflow-auto h-screen pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {summarySections.map((section, index) => (
          <div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg overflow-hidden"
          >
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <div
              className={`grid ${
                section.items.length === 2 ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              } gap-4`}
            >
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center p-4 border-r-2 border-green-50 last:border-r-0"
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 mb-2 rounded-full ${item.iconClass}`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div className="flex whitespace-nowrap justify-center items-center gap-1 ml-4 mr-4 text-center">
                    <p className="text-md font-bold text-gray-800">
                      {item.value}
                    </p>
                    <h3 className="text-sm font-medium text-gray-600">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Sales & Purchase</h2>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="h-64">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Top Selling Stock</h2>
            <a href="#" className="text-blue-500">See All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6 text-left font-medium text-gray-600">Name</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-600">Sold Quantity</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-600">Remaining Quantity</th>
                  <th className="py-3 px-6 text-left font-medium text-gray-600">Price</th>
                </tr>
              </thead>
              <tbody>
                {topSellingStock.map((stock, index) => (
                  <tr key={index} className="border-t whitespace-nowrap">
                    <td className="py-3 px-6">{stock.name}</td>
                    <td className="py-3 px-6">{stock.sold}</td>
                    <td className="py-3 px-6">{stock.remaining}</td>
                    <td className="py-3 px-6">{stock.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Low Quantity Stock</h2>
            <a href="#" className="text-blue-500">See All</a>
          </div>
          <div className="space-y-2">
            {lowQuantityStock.map((stock, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-red-300 rounded bg-red-50">
                <div className="flex items-center">
                  <img src={stock.image} alt={stock.name} className="w-10 h-10 mr-3" />
                  <div>
                    <h3 className="text-md font-semibold">{stock.name}</h3>
                    <p className="text-sm text-gray-600">Remaining Quantity: {stock.remaining}</p>
                  </div>
                </div>
                <span className="text-red-500 font-bold">{stock.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

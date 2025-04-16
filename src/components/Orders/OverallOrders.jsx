import React from "react";
import { 
  FiShoppingCart, 
  FiClock, 
  FiPackage, 
  FiTruck, 
  FiX 
} from "react-icons/fi";

const MetricCard = ({ title, value, change, icon, darkMode }) => (
  <div className={`p-5 rounded-xl transition-all ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:bg-gray-50"} shadow-sm hover:shadow-md border ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
    <div className="flex justify-between items-start">
      <div>
        <p className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{title}</p>
        <p className={`text-2xl font-light mt-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
        {icon}
      </div>
    </div>
  </div>
);

export const OverallOrders = ({ orderCounts, darkMode = false }) => {
  return (
    <div className="mb-8">
      <h3 className={`text-xl font-medium mb-6 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Orders Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <MetricCard 
          title="Total Orders"
          value={orderCounts?.totalOrders || 0}
          icon={<FiShoppingCart className={`text-lg ${darkMode ? "text-blue-400" : "text-blue-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Pending"
          value={orderCounts?.pending || 0}
          icon={<FiClock className={`text-lg ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Packing"
          value={orderCounts?.packing || 0}
          icon={<FiPackage className={`text-lg ${darkMode ? "text-purple-400" : "text-purple-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Delivery"
          value={orderCounts?.outForDelivery || 0}
          icon={<FiTruck className={`text-lg ${darkMode ? "text-green-400" : "text-green-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Cancelled"
          value={orderCounts?.cancelled || 0}
          icon={<FiX className={`text-lg ${darkMode ? "text-red-400" : "text-red-600"}`} />}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};
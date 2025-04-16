import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { 
  FiLayers, 
  FiPackage, 
  FiTrendingUp, 
  FiAlertTriangle,
  FiXCircle
} from "react-icons/fi";

const MetricCard = ({ title, value, icon, darkMode = false }) => (
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

export const OverallInventory = ({ darkMode = false }) => {
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({
    categoryCount: 0,
    headingCount: 0,
    comboCount: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/store/category-count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/storedata/prodCount", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProductCount(response.data.data.productCount);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product count:", err);
        setError("Failed to fetch product count.");
        setLoading(false);
      }
    };

    fetchProductCount();
  }, []);

  if (loading) return <p className={`text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mb-8">
      <h3 className={`text-xl font-medium mb-6 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>Inventory Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <MetricCard 
          title="Categories"
          value={counts.categoryCount}
          icon={<FiLayers className={`text-lg ${darkMode ? "text-blue-400" : "text-blue-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Total Products"
          value={productCount}
          icon={<FiPackage className={`text-lg ${darkMode ? "text-purple-400" : "text-purple-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Top Selling"
          value="5"
          icon={<FiTrendingUp className={`text-lg ${darkMode ? "text-green-400" : "text-green-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Low Stocks"
          value="12"
          icon={<FiAlertTriangle className={`text-lg ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />}
          darkMode={darkMode}
        />
        
        <MetricCard 
          title="Out of Stock"
          value="12"
          icon={<FiXCircle className={`text-lg ${darkMode ? "text-red-400" : "text-red-600"}`} />}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};
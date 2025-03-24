import React, { useEffect, useState } from "react";
import axios from "../../axios";

export const OverallInventory = () => {
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Categories Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Categories</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-blue-500">{counts.categoryCount}</p>
          </div>
        </div>

        {/* Total Products Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Total Products</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-purple-500">{productCount}</p>
          </div>
        </div>

        {/* Top Selling Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Top Selling</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-green-500">5</p>
          </div>
        </div>

        {/* Low Stocks Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Low Stocks</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-yellow-500">12</p>
          </div>
        </div>

        {/* Not In Stocks Card */}
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-500">
          <div className="text-gray-600 font-semibold text-lg mb-2">Not In Stocks</div>
          <div className="flex justify-between items-center">
            <p className="text-3xl font-bold text-red-500">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};
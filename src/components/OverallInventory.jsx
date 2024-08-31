import React, { useEffect, useState } from 'react';
import axios from '../../axios';

export const OverallInventory = () => {
  const [productCount, setProductCount] = useState(0); // State to store the product count
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
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
      const response = await axios.get('/store/category-count',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCounts(response.data);
    } catch (error) {
      console.error('Error fetching counts:', error);
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
        const response = await axios.get('/storedata/prodCount',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          
        ); // Replace with your actual API endpoint
        setProductCount(response.data.data.productCount); // Update state with the product count
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product count:', err);
        setError('Failed to fetch product count.');
        setLoading(false);
      }
    };

    fetchProductCount();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  if (loading) return <p>Loading...</p>; // Display loading state
  if (error) return <p>{error}</p>; // Display error message if there's an error

  return (
    <div className="bg-white p-4 mb-2 rounded-lg flex-none shadow">
      <div className="flex justify-between">
        <div className="w-1/2 px-10 py-3">
          <div className="font-semibold text-blue-500 mb-2 text-lg">Categories</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2 px-2 rounded-lg">
              <p className="font-bold text-lg">{counts.categoryCount}</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-lg text-yellow-500 mb-2">Total Products</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">{productCount}</p> {/* Display the product count dynamically */}
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-green-500 mb-2 text-lg">Top Selling</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">5</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-yellow-500 mb-2 text-lg">Low Stocks</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">12</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-10 py-3 border-l-2">
          <div className="font-semibold text-red-500 mb-2 text-lg">Not In Stocks</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

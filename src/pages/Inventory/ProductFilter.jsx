import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import axios from "../../../axios";

export const ProductFilter = ({ onSearchChange }) => {
  const [categories, setCategories] = useState([]);
  const UserToken = localStorage.getItem("token");

  const [filters, setFilters] = useState({
    productName: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/store/getCategories", {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [UserToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onSearchChange({ [name]: value });
  };

  return (
    <div className="bg-white p-2 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Product Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            name="productName"
            placeholder="Search by product name"
            value={filters.productName}
            onChange={handleInputChange}
            className="p-2 pl-10 border-2 rounded-lg w-full outline-none hover:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <div className="relative w-full md:w-52">
          <FiFilter className="absolute left-3 top-3 text-gray-500" />
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-full pl-10 hover:border-blue-500"
          >
            <option value="">Filter by category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
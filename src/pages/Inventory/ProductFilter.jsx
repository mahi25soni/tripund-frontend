import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from 'react-icons/fi';
import axios from "../../../axios";

export const ProductFilter = ({ onSearchChange }) => {
  const [categories, setCategories] = useState([]);
  const UserToken = localStorage.getItem("token");

  const [filters, setFilters] = useState({
    productName: "",
    category: "",
    priceRange: "",
    availability: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "/store/getCategories",
          {
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          }
        );
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
      <div className="flex gap-4">
        {/* Product Search */}
        <div className="relative">
          <input
            type="text"
            name="productName"
            placeholder="Search by product name"
            value={filters.productName}
            onChange={handleInputChange}
            className="p-2 pl-10 border-2 rounded-lg w-72 outline-none hover:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Product Category Filter */}
        <div className="relative">
          <FiFilter className="absolute left-3 top-4 text-gray-500" />
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-52 pl-10 hover:border-blue-500"
          ><option disabled value="">
                    Filter by category
                  </option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
          </select>
        </div>

        {/* Price Range Filter
        <div className="relative">
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg  w-full pl-10 hover:border-blue-500"
          >
            <option value="">Select Price Range</option>
            <option value="0-50">0 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-200">101 - 200</option>
            <option value="201-500">201 - 500</option>
            <option value="501+">501+</option>
          </select>
        </div> */}

        {/* Availability Filter */}
        {/* <div className="relative">
          <select
            name="availability"
            value={filters.availability}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-full pl-10 hover:border-blue-500"
          >
            <option value="">Select Availability</option>
            <option value="inStock">In Stock</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
        </div> */}
      </div>
    </div>
  );
};

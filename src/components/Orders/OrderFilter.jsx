import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from 'react-icons/fi';

export const SearchFilter = ({ onSearchChange }) => {
  const [filters, setFilters] = useState({
    userName: "",
    productName: "",
    status: "",
    deliveryAddress: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onSearchChange({ [name]: value });
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow w-full">
      <div className="flex gap-4">
        <div className="relative">
          <input
            type="text"
            name="orderId"
            placeholder="Search by orderId"
            value={filters.orderId}
            onChange={handleInputChange}
            className="p-2 pl-10 border-2 rounded-lg w-96 outline-none hover:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        <div className='relative'>
      <div>
      <FiFilter className="absolute left-3 top-4 text-gray-500" />

      </div>

<div>
        <select
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          className="p-2 border-2 rounded-lg w-52 pl-10 hover:border-blue-500"
          >
          <option value="">Select Status</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Returned">Returned</option>
          <option value="Delivered">Delivered</option>
        </select>
        </div>
</div>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
};

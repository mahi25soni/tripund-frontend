import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiFilter } from 'react-icons/fi';
import { BiReset } from "react-icons/bi";

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

  const handleResetFilter = (e) => {
    const resetFilter = {
      orderId: "",
      status: "",
      deliveryAddress: "",
      startDate: "",
      endDate: "",
    };

    setFilters(resetFilter);
    onSearchChange({});
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
          className="p-2 border-2 rounded-lg w-44 pl-8 hover:border-blue-500"
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
        <div className="">
      <button
          onClick={handleResetFilter}
          className="border-2 text-black px-4 h-full rounded-md hover:border-orange-500"
        ><BiReset size={20}/></button>
      </div>
      </div>
      
    </div>
  );
};

import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import { FiFilter } from "react-icons/fi";

export const SearchFilter = ({ onSearchChange }) => {
  const [filters, setFilters] = useState({
    orderId: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onSearchChange({ [name]: value });
  };

  const handleResetFilter = () => {
    const resetFilter = {
      orderId: "",
      status: "",
      startDate: "",
      endDate: "",
    };

    setFilters(resetFilter);
    onSearchChange(resetFilter);
  };

  const handleApplyFilter = () => {
    onSearchChange(filters);
    setIsFilterPopupOpen(false); // Close the popup after applying filters
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col md:flex-row gap-4">
        <div className="relative w-full">
          <input
            type="text"
            name="orderId"
            placeholder="Search by order ID"
            value={filters.orderId}
            onChange={handleInputChange}
            className="p-2 pl-10 border-2 rounded-lg w-full outline-none hover:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
        <div className="relative w-full">
          <FiFilter className="absolute left-3 top-3 text-gray-500" />
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-full pl-10 hover:border-blue-500"
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
        <div className="w-full">
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-full hover:border-blue-500"
          />
        </div>
        <div className="w-full">
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleInputChange}
            className="p-2 border-2 rounded-lg w-full hover:border-blue-500"
          />
        </div>
        <div className="w-full">
          <button
            onClick={handleResetFilter}
            className="p-2 border-2 rounded-lg w-full flex items-center justify-center gap-2 hover:border-blue-500"
          >
            <BiReset size={20} />
            Reset
          </button>
        </div>
      </div>

      {/* Mobile and Tablet View */}
      <div className="md:hidden">
        {/* Search Input */}
        <div className="relative w-full mb-4">
          <input
            type="text"
            name="orderId"
            placeholder="Search by order ID"
            value={filters.orderId}
            onChange={handleInputChange}
            className="p-2 pl-10 border-2 rounded-lg w-full outline-none hover:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>

        {/* Apply Filter Button */}
        <button
          onClick={() => setIsFilterPopupOpen(true)}
          className="w-full p-2 border-2 rounded-lg flex items-center justify-center gap-2 hover:border-blue-500 mb-4"
        >
          <FaFilter size={20} />
          Apply Filter
        </button>

        {/* Filter Popup */}
        {isFilterPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg w-11/12 max-w-md">
              {/* Popup Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              {/* Popup Content */}
              <div className="space-y-4">
                {/* Status Filter */}
                <div className="relative w-full">
                  <FiFilter className="absolute left-3 top-3 text-gray-500" />
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-lg w-full pl-10 hover:border-blue-500"
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

                {/* Start Date Filter */}
                <div className="w-full">
                  <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-lg w-full hover:border-blue-500"
                  />
                </div>

                {/* End Date Filter */}
                <div className="w-full">
                  <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleInputChange}
                    className="p-2 border-2 rounded-lg w-full hover:border-blue-500"
                  />
                </div>

                {/* Reset Button */}
                <div className="w-full">
                  <button
                    onClick={handleResetFilter}
                    className="p-2 border-2 rounded-lg w-full flex items-center justify-center gap-2 hover:border-blue-500"
                  >
                    <BiReset size={20} />
                    Reset
                  </button>
                </div>
              </div>

              {/* Apply Button */}
              <div className="mt-4">
                <button
                  onClick={handleApplyFilter}
                  className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
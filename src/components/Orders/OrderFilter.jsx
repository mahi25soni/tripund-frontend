import React, { useState } from 'react';

export const SearchFilter = ({ onSearchChange }) => {
  const [filters, setFilters] = useState({
    userName: '',
    productName: '',
    status:'',
    deliveryAddress: '',
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    onSearchChange({ [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex gap-4">
        <input
          type="text"
          name="orderId"
          placeholder="Search by orderId"
          value={filters.orderId}
          onChange={handleInputChange}
          className="border p-2 rounded w-full"
        />
        <select
  name="status"
  value={filters.status}
  onChange={handleInputChange}
  className="border p-2 rounded w-full"
>
  <option value="">Select Status</option>
  <option value="Processing">Processing</option>
  <option value="Pending">Pending</option>
  <option value="Out for Delivery">Out for Delivery</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Returned">Returned</option>
  <option value="Delivered">Delivered</option>
</select>

        
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

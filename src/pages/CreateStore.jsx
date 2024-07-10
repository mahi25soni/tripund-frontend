import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StoreForm = () => {
  const [formData, setFormData] = useState({
    logo: null,
    businessType: '',
    storeCategory: '',
    storeName: '',
    email: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const res = await axios.post('/api/store/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }
      });
      console.log('Store created successfully:', res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating store:', err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Store</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Logo:</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
                <span className="text-sm leading-normal">Add Logo</span>
                <input
                  type="file"
                  name="logo"
                  className="hidden"
                  onChange={handleChange}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Business Type:</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded border py-2"
              required
            >
              <option value="">Select Business Type</option>
              <option value="Wholeseller">Wholeseller</option>
              <option value="Supplier">Supplier</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store Category:</label>
            <select
              name="storeCategory"
              value={formData.storeCategory}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded border py-2"
              required
            >
              <option value="">Select Store Category</option>
              <option value="Kirana">Kirana</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Stationary">Stationary</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store Name:</label>
            <input
              type="text"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded border py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded border py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Store Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded border py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MouseImg from '../images/Mouse.png';
import tripund from '../images/tripund.jpeg';

const StoreForm = () => {
  const [formData, setFormData] = useState({
    logo: null,
    businessType: '',
    storeCategory: '',
    storeName: '',
    email: '',
    location: ''
  });

  const [logoPreview, setLogoPreview] = useState(null);

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

    const token = localStorage.getItem('token'); 

    try {
      const res = await axios.post('http://localhost:5000/api/store/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      console.log('Store created successfully:', res.data);
      navigate('/');
    } catch (err) {
      console.error('Error creating store:', err.response?.data || err.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className='w-1/2 bg-white h-screen '>
      <div className='w-fit m-auto py-32'>
        <img className='w-60 m-auto' src={MouseImg}/>
         <h2 className="text-6xl  m-auto font-bold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">Create Store</h2>
         <div className='h-2 bg-blue-600 m-auto rounded '></div>
         <div className="mt-auto px-6 py-3">
        <p className="text-sm text-gray-500">Powered by</p>
        <img src={tripund} alt="Powered by Company" className="mt-2 h-8" />
      </div>
      </div>
      </div>
      <div className='w-1/2 pl-12 bg'>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ml-20  ">
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-sm leading-normal">Add Logo</span>
            )}
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
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700">Business Type</label>
          <select
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="form-select mt-1 block w-full rounded border border-gray-300 py-2"
            required
          >
            <option value="">Select Business Type</option>
            <option value="Wholeseller">Wholeseller</option>
            <option value="Supplier">Supplier</option>
          </select>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">Store Category</label>
          <select
            name="storeCategory"
            value={formData.storeCategory}
            onChange={handleChange}
            className="form-select mt-1 block w-full rounded border border-gray-300 py-2"
            required
          >
            <option value="">Select Store Category</option>
            <option value="Kirana">Kirana</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Stationary">Stationary</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Store Name:</label>
        <input
          type="text"
          name="storeName"
          value={formData.storeName}
          onChange={handleChange}
          className="form-input mt-1 block w-full rounded border border-gray-300 py-2"
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
          className="form-input mt-1 block w-full rounded border border-gray-300 py-2"
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
          className="form-input mt-1 block w-full rounded border border-gray-300 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Create Store
      </button>
    </form>
      </div>
      </div>
    </div>
  );
};

export default StoreForm;

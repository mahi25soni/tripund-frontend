import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineShop, AiOutlineMail, AiOutlineEnvironment, AiOutlinePhone } from 'react-icons/ai';
import { FiCamera } from 'react-icons/fi';
import { BsInfoCircle } from 'react-icons/bs';
import { ClipLoader } from 'react-spinners';
import MouseImg from '../images/Mouse.png';
import logo from '../assets/logo.png';
import { showToast } from "../atoms/Toast"; 

const StoreForm = () => {
  const [formData, setFormData] = useState({
    logo: null,
    businessType: '',
    storeCategory: '',
    storeName: '',
    email: '',
    location: '',
    mobile: ''
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
      setLogoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationChange = (address) => {
    setFormData({ ...formData, location: address });
  };

  const validateMobile = () => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(formData.mobile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateMobile()) {
      toast.error('Mobile number must have 10 digits.');
      return;
    }
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    const token = localStorage.getItem('token');

    try {
      await axios.post('/store/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      showToast('Store created successfully!', "success");
      navigate('/dashboard');
    } catch (err) {
      showToast('Failed! Try again',"error");
    } finally {
      setLoading(false);
    }
  };

  const loadGoogleMapsAPI = () => {
    const google = window.google;
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('location'),
      { types: ['geocode'] }
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      handleLocationChange(place.formatted_address);
    });
  };

  React.useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDqp6ukm--d3iZKhlH23VgiGVieq4HsH4Q&libraries=places`;
      script.async = true;
      script.onload = loadGoogleMapsAPI;
      document.body.appendChild(script);
    } else {
      loadGoogleMapsAPI();
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="w-1/2 bg-white h-screen">
        <div className="w-fit m-auto py-32">
          <img className="w-60 m-auto" src={MouseImg} alt="Mouse" />
          <h2 className="text-6xl m-auto font-bold mb-4 bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-500 inline-block text-transparent bg-clip-text">
            Create Store
          </h2>
          <div className="h-2 bg-blue-600 m-auto rounded"></div>
          <div className="mt-auto px-6 py-3">
            <p className="text-sm text-gray-500">Powered by</p>
            <img src={logo} alt="Powered by Company" className="mt-2 h-8" />
          </div>
        </div>
      </div>
      <div className="w-1/2 pl-12">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md ml-20">
          <div className="flex items-center justify-center mb-4">
            <BsInfoCircle className="text-blue-500 mr-2" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">Create Store!</h2>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Please fill your store details to create your store.
          </p>
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
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiCamera size={24} />
                      <span className="text-sm mt-2">Add Logo</span>
                    </div>
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
            {/* Business Type */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 flex items-center">
                  <AiOutlineShop className="mr-2" />
                  Business Type
                </label>
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
              {/* Store Category */}
              <div className="w-1/2">
                <label className="block text-gray-700 flex items-center">
                  <AiOutlineShop className="mr-2" />
                  Store Category
                </label>
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
            {/* Store Name */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <AiOutlineShop className="mr-2" />
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="form-input mt-1 px-2 block w-full rounded border border-gray-300 py-2"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <AiOutlineEnvironment className="mr-2" />
                Store Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-input mt-1 px-2 block w-full rounded border border-gray-300 py-2"
                placeholder="Enter your location"
                required
              />
            </div>
            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <AiOutlinePhone className="mr-2" />
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-input mt-1 px-2 block w-full rounded border border-gray-300 py-2"
                placeholder="+91XXXXXXXXXX"
                required
              />
            </div>
            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <AiOutlineMail className="mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input mt-1 px-2 block w-full rounded border border-gray-300 py-2"
                required
              />
            </div>
           
            
            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StoreForm;

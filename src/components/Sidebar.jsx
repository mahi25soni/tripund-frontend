import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FaTachometerAlt, FaUser, FaCog } from 'react-icons/fa'; // Import icons from react-icons
import tripund from '../images/tripund.jpeg';

const Sidebar = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/store/logo-url', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLogoUrl(response.data.logoUrl);
      } catch (error) {
        console.error('Error fetching logo URL:', error);
        setError('Failed to load logo');
      }
    };

    fetchLogoUrl();
  }, []);

  return (
    <div className="h-screen w-64 bg-white shadow-md fixed top-0 left-0 flex flex-col">
      <div className="flex items-center pl-6 mb-6">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-16 w-16 object-cover rounded-full" />
        ) : (
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            {error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <FaTachometerAlt className="mr-4" />
        Dashboard
      </NavLink>
      <NavLink
        to="/inventory"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <FaUser className="mr-4" />
        Inventory
      </NavLink>

      {/* Settings and Support */}
      <div className="flex-1"></div> {/* This will push Settings and Support to the bottom */}
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <FaCog className="mr-4" />
        Settings
      </NavLink>
      <NavLink
        to="/support"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <FaUser className="mr-4" />
        Support
      </NavLink>

      {/* Powered by Logo */}
      <div className="mt-auto px-6 py-3">
        <p className="text-sm text-gray-500">Powered by</p>
        <img src={tripund} alt="Powered by Company" className="mt-2 h-8" />
      </div>
    </div>
  );
};

export default Sidebar;

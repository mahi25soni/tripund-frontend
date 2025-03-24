import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';
import { IoBagCheckOutline, IoSettingsOutline } from 'react-icons/io5';
import { PiSealPercent } from 'react-icons/pi';
import { TfiHelpAlt } from 'react-icons/tfi';
import { AiOutlineEye, AiOutlineUnorderedList, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineCategory } from 'react-icons/md';
import axios from '.././../axios';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/store/logo-url', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogoUrl(response.data.logoUrl);
      } catch (error) {
        console.error('Error fetching logo URL:', error);
        setError('Failed to load logo');
      }
    };

    fetchLogoUrl();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInventoryToggle = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <div>
      {/* Hamburger Menu for Mobile */}
      <button
        className=" lg:hidden fixed top-5 left-2 z-30 text-2xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 z-20 lg:translate-x-0 lg:sticky lg:z-0`}
      >
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
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
            }`
          }
        >
          <RxDashboard className="mr-4" />
          Dashboard
        </NavLink>

        {/* <div>
          <div
            className={`flex items-center px-6 py-3 cursor-pointer hover:bg-gray-100 ${
              isInventoryOpen ? 'bg-gray-100 text-blue-500' : 'text-black'
            }`}
            onClick={handleInventoryToggle}
          >
            <BsBoxSeam className="mr-4" />
            Inventory
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isInventoryOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pl-12">
              <NavLink
                to="/inventory/view-all"
                className={({ isActive }) =>
                  `block flex items-center px-6 py-2 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
                  }`
                }
              >
                <AiOutlineEye className="mr-4" />
                View All
              </NavLink>
              <NavLink
                to="/inventory/list-product"
                className={({ isActive }) =>
                  `block flex items-center px-6 py-2 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
                  }`
                }
              >
                <AiOutlineUnorderedList className="mr-4" />
                List Product
              </NavLink>
            </div>
          </div>
        </div> */}

        <NavLink
                to="/inventory/view-all"
                className={({ isActive }) =>
                  `block flex items-center px-6 py-2 hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
                  }`
                }
              >
            <BsBoxSeam className="mr-4" />
              Inventory
              </NavLink>

        <NavLink
          to="/category"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
            }`
          }
        >
          <MdOutlineCategory className="mr-4" />
          Category
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
            }`
          }
        >
          <IoBagCheckOutline className="mr-4" />
          Orders
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'bg-gray-100 text-blue-500' : 'text-black'
            }`
          }
        >
          <PiSealPercent className="mr-4" />
          Offers
        </NavLink>

        <div className="flex-1"></div>
        <hr />

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'text-blue-500' : 'text-black'
            }`
          }
        >
          <IoSettingsOutline className="mr-4" />
          Settings
        </NavLink>

        <NavLink
          to="/support"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-gray-100 ${
              isActive ? 'text-blue-500' : 'text-black'
            }`
          }
        >
          <TfiHelpAlt className="mr-4" />
          Support
        </NavLink>

        <div className="mt-auto px-6 py-3">
          <p className="text-sm text-gray-500">Powered by</p>
          <img src={logo} alt="Powered by Company" className="w-32 h-16 object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { RxDashboard } from "react-icons/rx";
import { BsBoxSeam } from "react-icons/bs";
import { IoBagCheckOutline, IoSettingsOutline } from "react-icons/io5";
import { PiSealPercent } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { TfiHelpAlt } from "react-icons/tfi";
import { AiOutlineEye, AiOutlinePlus, AiOutlineUnorderedList } from "react-icons/ai";
import tripund from '../images/tripund.jpeg';
import { MdOutlineCategory } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { IoPieChartOutline } from "react-icons/io5";

const Sidebar = () => {
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState('');
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/store/logo-url', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLogoUrl(response.data.logoUrl);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching logo URL:', error);
        setError('Failed to load logo');
      }
    };

    fetchLogoUrl();
  }, []);

  const handleInventoryToggle = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  const handleCategoryToggle = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

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
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <RxDashboard className="mr-4" />
        Dashboard
      </NavLink>

      <div>
        <div
          className={`flex items-center px-6 py-3 cursor-pointer hover:bg-gray-100 ${isInventoryOpen ? 'bg-gray-100 text-blue-500' : 'text-black'}`}
          onClick={handleInventoryToggle}
        >
          <BsBoxSeam className="mr-4" />
          Inventory
        </div>
        <div
          className={`transition-all duration-300 overflow-hidden ${isInventoryOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="pl-12">
            <NavLink
              to="/inventory/view-all"
              className={({ isActive }) =>
                `block flex items-center px-6 py-2 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
              }
            >
              <AiOutlineEye className="mr-4" />
              View All
            </NavLink>
            <NavLink
              to="/inventory/create-category"
              className={({ isActive }) =>
                `block flex items-center px-6 py-2 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
              }
            >
              <AiOutlinePlus className="mr-4" />
              Create Category
            </NavLink>
            <NavLink
              to="/inventory/list-product"
              className={({ isActive }) =>
                `block flex items-center px-6 py-2 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
              }
            >
              <AiOutlineUnorderedList className="mr-4" />
              List Product
            </NavLink>
          </div>
        </div>
      </div>
      
      <div>
      <NavLink
        to="/category"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <MdOutlineCategory className="mr-4" />
        Category
      </NavLink>
      </div>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <IoBagCheckOutline className="mr-4" />
        Orders
      </NavLink>

      <NavLink
        to="/offers"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <PiSealPercent className="mr-4" />
        Offers
      </NavLink>

      <NavLink
        to="/stores"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <PiSealPercent className="mr-4" />
       Store
      </NavLink>


      <NavLink
        to="/Email"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <PiSealPercent className="mr-4" />
       Email
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <IoPieChartOutline className="mr-4" />
        Reports
      </NavLink>

      <NavLink
        to="/user"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-blue-500' : 'text-black'}`
        }
      >
        <FiUser className="mr-4" />
        Users
      </NavLink>

      {/* Settings and Support */}
      <div className="flex-1"></div> {/* This will push Settings and Support to the bottom */}
      <hr></hr>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <IoSettingsOutline className="mr-4" />
        Settings
      </NavLink>
      <NavLink
        to="/support"
        className={({ isActive }) =>
          `flex items-center px-6 py-3 hover:bg-gray-100 ${isActive ? 'bg-blue-500 text-white' : 'text-black'}`
        }
      >
        <TfiHelpAlt className="mr-4" />
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

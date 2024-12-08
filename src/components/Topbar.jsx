import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { FiBell, FiSearch } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { BsQrCodeScan } from 'react-icons/bs';
import QrCodeGenerator from './QRCodeGenerator'; 
import { Link } from 'react-router-dom';
import { useSocket } from './Context/SocketContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrCodePopupOpen, setQrCodePopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { notifications } = useSocket(); 
  const [storeName, setStoreName] = useState('');


  useEffect(() => {
    const fetchUserDataAndStoreData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Navigate to login if no token is found
        return;
      }
  
      try {
        // Configure headers for requests
        const config = { headers: { Authorization: `Bearer ${token}` } };
  
        // Fetch user data
        const userResponse = await axios.get('/auth/user', config);
        setUserName(userResponse.data.name);
  
        // Fetch store data
        const storeResponse = await axios.get('/store/storeId', config);
        setStoreName(storeResponse.data.store.storeName);
      } catch (error) {
        console.error('Error fetching data:', error);
  
        if (error.response && error.response.status === 404) {
          // Navigate to createStore if store data is not found
          toast.error("Store does not exist. Redirecting to create store...");
          navigate('/createStore');
        } else {
          // Navigate to login for other errors
          navigate('/login');
        }
      }
    };
  
    fetchUserDataAndStoreData();
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleQrCodePopup = () => {
    setQrCodePopupOpen(!qrCodePopupOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;


  return (
    <div className="h-16 w-5/6 bg-white flex items-center justify-between px-6 shadow fixed top-0 left-64 z-10">
      <div className="flex items-center">
      <ToastContainer/>
        <form onSubmit={handleSearch} className="relative">
          {/* <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-80 border-2 border-gray-300 rounded-md focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-500 border-l-2 w-6 pl-1">
            <FiSearch className="mt-1 text-lg" />
          </button> */}
        </form>
      </div>

      <div className="flex items-center relative">
        <div className="text-black text-lg font-medium mr-6">{storeName || userName || 'My Dashboard'}</div>
        <BsQrCodeScan className="text-black text-xl mr-6 cursor-pointer" onClick={toggleQrCodePopup} />

        <div className="relative mr-4">
          <Link to='/notification' className="relative">
              <FiBell className="text-black text-xl m-2 cursor-pointer" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </Link>
        </div>

        <FaUserCircle className="text-black text-3xl cursor-pointer" onClick={toggleDropdown} />
        {dropdownOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded-md overflow-hidden z-10">
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/profile')}>View Profile</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/profile/edit')}>Edit Profile</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>

      {qrCodePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <button className="relative top-2 left-2 text-gray-500 hover:text-gray-800" onClick={toggleQrCodePopup}>
              &times;
            </button>
            <QrCodeGenerator />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

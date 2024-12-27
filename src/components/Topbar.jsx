import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { FiBell } from 'react-icons/fi';
import { BsQrCodeScan } from 'react-icons/bs';
import QrCodeGenerator from './QRCodeGenerator'; 
import { Link } from 'react-router-dom';
import { useSocket } from './Context/SocketContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiUser } from 'react-icons/bi';

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [qrCodePopupOpen, setQrCodePopupOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [storeLogo, setStoreLogo] = useState('');
  const [storeName, setStoreName] = useState('');
  const navigate = useNavigate();
  const { notifications } = useSocket(); 
  const qrCodePopupRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserDataAndStoreData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const userResponse = await axios.get('/auth/user', config);
        setUserName(userResponse.data.name);
        const storeResponse = await axios.get('/store/storeId', config);
        setStoreLogo(storeResponse.data.store.logo);
        setStoreName(storeResponse.data.store.name);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 404) {
          toast.error("Store does not exist. Redirecting to create store...");
          navigate('/createStore');
        } else {
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

  const handleClickOutside = (event) => {
    if (
      (qrCodePopupRef.current && !qrCodePopupRef.current.contains(event.target)) ||
      (dropdownRef.current && !dropdownRef.current.contains(event.target))
    ) {
      setQrCodePopupOpen(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (qrCodePopupOpen || dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [qrCodePopupOpen, dropdownOpen]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="h-16 lg:w-5/6 w-full bg-white flex items-center justify-between px-6 shadow fixed top-0 lg:left-64 z-10">
      <div className="flex items-center">
        <ToastContainer />
        <img src={storeLogo} alt="Logo" className=" lg:hidden h-12 w-20 object-cover rounded" />
      </div>

      <div className="flex items-center relative">
        <BsQrCodeScan className="text-black text-xl lg:mr-6 mr-2 cursor-pointer" onClick={toggleQrCodePopup} />

        <div className="relative mr-4">
          <Link to='/notification' className="relative">
            <FiBell className="text-black text-xl mx-2 cursor-pointer" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        <BiUser className="text-black text-xl lg:mr-6 cursor-pointer" onClick={toggleDropdown} />
        {dropdownOpen && (
          <div ref={dropdownRef} className="absolute top-10 right-0 w-48 bg-white shadow-md rounded-md overflow-hidden z-10">
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/forgot-password')}>Update Password</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/settings')}>Settings</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/support')}>Support</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>

      {qrCodePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={qrCodePopupRef} className="bg-white p-8 rounded-lg">
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

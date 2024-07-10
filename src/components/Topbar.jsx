import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiBell, FiSearch } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const TopBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get('/api/auth/user', config);
          setUserName(response.data.name);
        } else {
          navigate('/login'); // Redirect to login if no token
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/login'); // Redirect to login if fetch fails
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search action here, e.g., navigate to a search results page
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="h-16 w-5/6 bg-white flex items-center justify-between px-6 shadow-md fixed top-0 left-64 z-50">
      <div className="flex items-center ">
        <form onSubmit={handleSearch} className="relative ">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-80 border-2 border-gray-300 rounded-md  focus:outline-none"
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-500 border-l-2 w-6 pl-1">
            <FiSearch className='mt-1 text-lg'/>
          </button>
        </form>
        
      </div>

      <div className="flex items-center relative">
      <div className="text-black text-lg font-medium mr-6">{userName || 'My Dashboard'}</div>

        <FiBell className="text-black text-xl mr-6 cursor-pointer" />
        <FaUserCircle className="text-black text-3xl cursor-pointer" onClick={toggleDropdown} />
        {dropdownOpen && (
          <div className="absolute top-12 right-0 w-48 bg-white shadow-md rounded-md overflow-hidden z-10">
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/profile')}>View Profile</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => navigate('/profile/edit')}>Edit Profile</div>
            <div className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;

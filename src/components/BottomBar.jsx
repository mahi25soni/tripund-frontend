import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';
import { PiSealPercent } from 'react-icons/pi';
import { IoBagCheckOutline } from 'react-icons/io5';
import { MdOutlineCategory } from 'react-icons/md';

function BottomBar() {
  return (
    <div className="sm:hidden grid grid-cols-5 fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-sm z-50">
      {/* Dashboard Link */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 w-full ${
            isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`
        }
      >
        <RxDashboard className="text-xl mb-1" />
        <span className="text-xs font-medium">Dashboard</span>
      </NavLink>

      {/* Inventory Link - Corrected */}
      <NavLink
        to="/inventory/view-all"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 w-full ${
            isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`
        }
      >
        <BsBoxSeam className="text-xl mb-1" />
        <span className="text-xs font-medium">Inventory</span>
      </NavLink>

      {/* Category Link */}
      <NavLink
        to="/category"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 w-full ${
            isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`
        }
      >
        <MdOutlineCategory className="text-xl mb-1" />
        <span className="text-xs font-medium">Category</span>
      </NavLink>

      {/* Orders Link */}
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 w-full ${
            isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`
        }
      >
        <IoBagCheckOutline className="text-xl mb-1" />
        <span className="text-xs font-medium">Orders</span>
      </NavLink>

      {/* Offers Link */}
      <NavLink
        to="/offers"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 w-full ${
            isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
          } transition-colors`
        }
      >
        <PiSealPercent className="text-xl mb-1" />
        <span className="text-xs font-medium">Offers</span>
      </NavLink>
    </div>
  );
}

export default BottomBar;
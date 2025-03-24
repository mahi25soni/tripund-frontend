import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BsBoxSeam } from 'react-icons/bs';
import { PiSealPercent } from 'react-icons/pi';
import { IoBagCheckOutline } from 'react-icons/io5';
import { AiOutlineEye, AiOutlineUnorderedList } from 'react-icons/ai';
import { MdOutlineCategory } from 'react-icons/md';

function BottomBar() {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  const handleInventoryToggle = () => {
    setIsInventoryOpen((prev) => !prev);
  };

  const closeInventory = () => {
    setIsInventoryOpen(false);
  };

  return (
    <div className="sm:hidden grid grid-cols-5 fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 justify-between">
      <NavLink
        to="/dashboard"
        onClick={closeInventory}
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-3 w-full ${
            isActive ? 'text-blue-500' : 'text-gray-600'
          }`
        }
      >
        <RxDashboard className="text-xl" />
        <span className="text-xs">Dashboard</span>
      </NavLink>
      <div className="relative">
        <div
          className={`flex-1 flex flex-col items-center justify-center py-3 w-full cursor-pointer ${
            isInventoryOpen ? 'text-blue-500' : 'text-gray-600'
          }`}
          onClick={handleInventoryToggle}
        >
          <BsBoxSeam className="text-xl" />
          <span className="text-xs">Inventory</span>
        </div>

        {isInventoryOpen && (
          <div className="absolute bottom-14 left-0 w-40 bg-white border rounded-lg shadow-lg">
            <NavLink
              to="/inventory/view-all"
              onClick={closeInventory}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? 'text-blue-500' : 'text-gray-600'
                }`
              }
            >
              <AiOutlineEye className="mr-2" />
              View All
            </NavLink>
            <NavLink
              to="/inventory/list-product"
              onClick={closeInventory}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${
                  isActive ? 'text-blue-500' : 'text-gray-600'
                }`
              }
            >
              <AiOutlineUnorderedList className="mr-2" />
              List Product
            </NavLink>
          </div>
        )}
      </div>

      {/* Category Link */}
      <NavLink
        to="/category"
        onClick={closeInventory}
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-3 w-full ${
            isActive ? 'text-blue-500' : 'text-gray-600'
          }`
        }
      >
        <MdOutlineCategory className="text-xl" />
        <span className="text-xs">Category</span>
      </NavLink>
      <NavLink
        to="/orders"
        onClick={closeInventory}
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-3 w-full ${
            isActive ? 'text-blue-500' : 'text-gray-600'
          }`
        }
      >
        <IoBagCheckOutline className="text-xl" />
        <span className="text-xs">Orders</span>
      </NavLink>

      {/* Offers Link */}
      <NavLink
        to="/offers"
        onClick={closeInventory}
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-3 w-full ${
            isActive ? 'text-blue-500' : 'text-gray-600'
          }`
        }
      >
        <PiSealPercent className="text-xl" />
        <span className="text-xs">Offers</span>
      </NavLink>
    </div>
  );
}

export default BottomBar;
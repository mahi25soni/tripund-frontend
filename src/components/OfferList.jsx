import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { AddOffer } from "./AddOffer";

export const OfferList = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  return (
    <div className="flex flex-wrap justify-start">
      <div className="h-64 w-64 px-5  flex flex-col justify-evenly bg-white">
        <div className="flex justify-between items-center relative">
          <div className="text-green-500 bg-green-200 font-bold text-xl p-2 rounded-md">
            25%
          </div>
          <FiMoreVertical className="h-5 w-5"  onClick={toggleDropdown} />
          {isDropdownOpen &&  <div className="absolute right-6 top-2 bg-white shadow-slate-400 shadow-lg flex flex-col items-start gap-1 p-2 rounded-md">
            <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md ">
              Mark as disable
            </button>
            <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md">Delete</button>
            <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md ">Edit</button>
          </div>}

        </div>

        <p className="text-2xl font-normal">Summer Festive Offer</p>
        <p className="text-[18px] font-normal text-gray-600">
          Validity : 25 July
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="font-normal mr-1 text-xl">Product </span>
            <div className="text-orange-500 bg-orange-200 px-2.5 py-1 inline rounded-md font-semibold">
              15
            </div>
          </div>
          <button className="p-1 bg-blue-500 rounded-md">
            <IoAddSharp className="h-6 w-6 font-bold text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { AddOffer } from "./AddOffer";
import moment from "moment";
import { SingleOffer } from "../pages/Offer/SingleOffer";

export const OfferList = ({ allOffersList, setCurrentSingleOffer }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleDropdown = (offerId) => {
    setIsDropdownOpen((prevData) => ({
        ...prevData,
        [offerId] : !isDropdownOpen[offerId]
    }));
  };

  const handleOpenOfferData = (offerId) => {
    allOffersList?.map((offer) => {
      if(offer?._id === offerId) {
        setCurrentSingleOffer(offer);
        return;
      }
    })
  }
  return (
    <>
    <div className="flex flex-wrap justify-start gap-5">
      {allOffersList?.map((offer) => {
        return (
          <div className="h-64 w-64 px-5  flex flex-col justify-evenly bg-white">
            <div className="flex justify-between items-center relative">
              <div className="text-green-500 bg-green-200 font-bold text-xl p-2 rounded-md">
                {offer?.offer_discount}%
              </div>
              <FiMoreVertical className="h-5 w-5" onClick={() => toggleDropdown(offer?._id)} />
              {isDropdownOpen[offer?._id] && (
                <div className="absolute right-6 top-2 bg-white shadow-slate-400 shadow-lg flex flex-col items-start gap-1 p-2 rounded-md">
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md ">
                    Mark as disable
                  </button>
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md">
                    Delete
                  </button>
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md ">
                    Edit
                  </button>
                </div>
              )}
            </div>

            <p className="text-2xl font-normal">{offer?.offer_heading}</p>
            <p className="text-[18px] font-normal text-gray-600">
              Validity : { moment(offer?.end_date).format('DD MMMM YYYY')}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-normal mr-1 text-xl">Product </span>
                <div className="text-orange-500 bg-orange-200 px-2.5 py-1 inline rounded-md font-semibold">
                  15
                </div>
              </div>
              <button className="p-1 bg-blue-500 rounded-md" onClick={() => handleOpenOfferData(offer?._id)}>
                <IoAddSharp className="h-6 w-6 font-bold text-white" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
 
    </>
  );
};

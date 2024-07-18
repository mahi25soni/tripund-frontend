import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import { AddOffer } from "./AddOffer";
import moment from "moment";
import { SingleOffer } from "../pages/Offer/SingleOffer";
import axios from '../../axios.jsx'

export const OfferList = ({ setAllOffersList, allOffersList, setCurrentSingleOffer }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const UserToken = localStorage.getItem("token");


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

  const handleDeleteOffer = async (offerId) => {
    console.log("offer id is ", offerId);
    const {data} = await axios.delete(`/offer/delete-offer/${offerId}`, {
      headers : {
        Authorization : "Bearer " + UserToken
      }
    })

    if(data?.success) {
      const updatedOffers = allOffersList.filter((offer) => offer?._id !== offerId);
      setAllOffersList(updatedOffers);
    }
    else {
      setIsDropdownOpen({offerId : false});
    }
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
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md " onClick={() => handleDisableOffer(offer?._id)}>
                    Mark as disable
                  </button>
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md" onClick={() => handleDeleteOffer(offer?._id)}>
                    Delete
                  </button>
                  <button className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md " onClick={() => handleEditOffer(offer?._id)}>
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
                  {offer?.number_of_products}
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

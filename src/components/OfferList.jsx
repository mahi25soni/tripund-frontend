import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export const OfferList = ({
  allOffersList,
  handleDeleteOffer,
  handleEditOffer,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const navigate = useNavigate();

  const toggleDropdown = (offerId) => {
    setIsDropdownOpen((prevData) => ({
      ...prevData,
      [offerId]: !isDropdownOpen[offerId],
    }));
  };

  const handleOpenOfferData = (offerId) => {
    navigate(`/offers/add-product/${offerId}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="grid lg:grid-cols-3 gap-4 rounded-md">
        {allOffersList?.map((offer) => {
          const isExpired = moment().isAfter(moment(offer.end_date));

          return (
            <div
              key={offer._id}
              className="w-full flex flex-col justify-evenly bg-white rounded-md hover:shadow-lg hover:transition-x-12 relative"
            >
              {/* Tag for Expired or Active */}
              <div
                className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-bold ${
                  isExpired ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
                }`}
              >
                {isExpired ? "Expired" : "Active"}
              </div>

              <div className="h-36 w-full rounded-md">
                <img
                  src={offer?.offer_banner}
                  alt={`${offer?.offer_heading} banner`}
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between items-center relative m-2">
                <p className="text-xl font-semibold">{offer?.offer_heading}</p>
                <FiMoreVertical
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => toggleDropdown(offer._id)}
                />
                {isDropdownOpen[offer._id] && (
                  <div className="absolute right-6 top-2 bg-white shadow-lg flex flex-col items-start gap-1 p-2 rounded-md">
                    <button
                      className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md"
                      onClick={() => handleDeleteOffer(offer._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="border-none bg-transparent hover:bg-gray-200 p-1 rounded-md"
                      onClick={() => handleEditOffer(offer._id)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between m-2">
                <div className="text-green-500 bg-green-200 font-bold text-xl p-2 rounded-md">
                  {offer?.offer_discount}%
                </div>
                <div>
                  <span className="font-normal mr-1 text-xl">Product</span>
                  <div className="text-orange-500 bg-orange-200 px-2.5 py-1 inline rounded-md font-semibold">
                    {offer?.number_of_products}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center m-2">
                <p className="text-[18px] font-normal text-gray-400">
                  Validity: {moment(offer?.end_date).format("DD MMMM YYYY")}
                </p>
                <button
                  className="p-1 bg-blue-500 rounded-md"
                  onClick={() => handleOpenOfferData(offer._id)}
                >
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
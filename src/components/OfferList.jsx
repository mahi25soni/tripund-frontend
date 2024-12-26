import React, { useState, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoAddSharp } from "react-icons/io5";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../axios.jsx";
import Spinner from "./Spinner";
import { EditOffer } from "./EditOffer.jsx";
import { useNavigate } from "react-router-dom";

export const OfferList = ({
  setAllOffersList,
  allOffersList,
  setCurrentSingleOffer,
  setAddOfferPopUp,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [editOfferData, setEditOfferData] = useState(null);
  const [editOfferPopUp, setEditOfferPopUp] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const UserToken = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get("/offer/get-all", {
          headers: {
            Authorization: "Bearer " + UserToken,
          },
        });

        if (data?.success) {
          if (JSON.stringify(allOffersList) !== JSON.stringify(data.offers)) {
            setAllOffersList(data.offers);
          }
        } else {
          toast.error("Failed to fetch offers.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching offers.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [UserToken, setAllOffersList]);

  const toggleDropdown = (offerId) => {
    setIsDropdownOpen((prevData) => ({
      ...prevData,
      [offerId]: !isDropdownOpen[offerId],
    }));
  };

  const handleOpenOfferData = (offerId) => {    
    navigate(`/offers/add-product/${offerId}`)
  };

  const handleDeleteOffer = async (offerId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`/offer/delete-offer/${offerId}`, {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      });

      if (data?.success) {
        const updatedOffers = allOffersList.filter(
          (offer) => offer._id !== offerId
        );
        setAllOffersList(updatedOffers);
        toast.success("Offer deleted successfully!");
      } else {
        toast.error("Failed to delete offer.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the offer.");
    } finally {
      setIsLoading(false);
      setIsDropdownOpen({ [offerId]: false });
    }
  };

  const handleEditOffer = (offerId) => {
    setSelectedOfferId(offerId);
    setEditOfferPopUp(true);
  };

  if (isLoading) {
    return (
      <>
        <ToastContainer />
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-3 gap-4 rounded-md">
        {allOffersList?.map((offer) => (
          <div
            key={offer._id}
            className="w-full flex flex-col justify-evenly bg-white rounded-md"
          >
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
                    onClick={() => handleEditOffer(offer?._id)}
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
        ))}
      </div>
      {editOfferPopUp && (
        <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
        <EditOffer
          setEditOfferPopUp={setEditOfferPopUp}
          offerId={selectedOfferId}
          setAllOffersList={setAllOffersList}
        />
        </div>
      )}
    </>
  );
};

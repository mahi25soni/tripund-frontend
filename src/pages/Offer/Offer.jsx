import React, { useEffect, useState } from "react";
import { OfferList } from "../../components/OfferList";
import { AddOffer } from "../../components/AddOffer";
import { EditOffer } from "../../components/EditOffer";
import CardWrapper from "../../atoms/CardWrapper";
import axios from "../../../axios.jsx";
import Spinner from "../../components/Spinner.jsx";

export const Offer = () => {
  const [allOffersList, setAllOffersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addOfferPopUp, setAddOfferPopUp] = useState(false);
  const [editOfferPopUp, setEditOfferPopUp] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState(null);

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get("/offer/get-all", {
          headers: {
            Authorization: "Bearer " + UserToken,
          },
        });
        setAllOffersList(data?.data || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [UserToken]);

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
      } else {
        console.error("Failed to delete offer.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the offer:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditOffer = (offerId) => {
    setSelectedOfferId(offerId);
    setEditOfferPopUp(true);
  };

  const handleAddOffer = () => {
    setAddOfferPopUp(true);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-4">
          <CardWrapper
            header_name={"Offers"}
            value={allOffersList?.length}
            button_name={"Create Offers"}
            button_function={handleAddOffer}
            className="h-[120px]"
            firstChildClasses="h-full"
          ></CardWrapper>
          <OfferList
            allOffersList={allOffersList}
            handleDeleteOffer={handleDeleteOffer}
            handleEditOffer={handleEditOffer}
          />
          {addOfferPopUp && (
            <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
              <AddOffer
                setAddOfferPopUp={setAddOfferPopUp}
                setAllOffersList={setAllOffersList}
              />
            </div>
          )}
          {editOfferPopUp && selectedOfferId && (
            <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
              <EditOffer
                setEditOfferPopUp={setEditOfferPopUp}
                offerId={selectedOfferId}
                setAllOffersList={setAllOffersList}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
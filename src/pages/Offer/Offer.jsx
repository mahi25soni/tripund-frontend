import React, { useEffect, useState } from "react";
import { OfferList } from "../../components/OfferList";
import { AddOffer } from "../../components/AddOffer";
import CardWrapper from "../../atoms/CardWrapper";
import axios from "../../../axios.jsx";
import { SingleOffer } from "./SingleOffer.jsx";
import Spinner from "../../components/Spinner.jsx";

export const Offer = () => {
  const [addOfferPopUp, setAddOfferPopUp] = useState(false);
  const [allOffersList, setAllOffersList] = useState([]);
  const [currentSingleOffer, setCurrentSingleOffer] = useState(null);
  const [editOffer, setEditOffer] = useState(null); 

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/offer/get-all", {
          headers: {
            Authorization: "Bearer " + UserToken,
          },
        });
        setAllOffersList(data?.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    })();
  }, []);

  const openAddOfferPopUp = (offer = null) => {
    setEditOffer(offer); // Set the offer to edit, or null for creating a new offer
    setAddOfferPopUp(true);
  };

  const closeAddOfferPopUp = () => {
    setCurrentSingleOffer(false);
  };

  const handleUpdateOffer = (offerId, data) => {
    setAllOffersList((prevData) =>
        prevData.map((offer) =>
            offer.id === offerId ? { ...offer, ...data } : offer
        )
    );
};

const addOffer = (newOffer) => {
  setAllOffersList((prevData) => [...prevData, newOffer]);
};


  return (
    <>
      {currentSingleOffer ? (
        <SingleOffer currentSingleOffer={currentSingleOffer}></SingleOffer>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <CardWrapper
              header_name={"Offers"}
              value={allOffersList?.length}
              button_name={"Create Offers"}
              button_function={() => openAddOfferPopUp()}
              className="h-[120px]"
              firstChildClasses="h-full"
            ></CardWrapper>
            <OfferList
              allOffersList={allOffersList}
              setCurrentSingleOffer={setCurrentSingleOffer}
              setAllOffersList={setAllOffersList}
              openAddOfferPopUp={openAddOfferPopUp} 
            ></OfferList>
          </div>
          {addOfferPopUp && (
            <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
              <AddOffer
                setAddOfferPopUp={setAddOfferPopUp}
                setAllOffersList={setAllOffersList}
              ></AddOffer>
            </div>
          )}
        </>
      )}
    </>
  );
};

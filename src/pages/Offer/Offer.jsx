import React, { useEffect, useState } from "react";
import { OfferList } from "../../components/OfferList";
import { AddOffer } from "../../components/AddOffer";
import CardWrapper from "../../atoms/CardWrapper";
import axios from "axios";
import axios from "../../../axios.jsx";
import { SingleOffer } from "./SingleOffer.jsx";

export const Offer = () => {
  const [addOfferPopUp, setAddOfferPopUp] = useState(false);
  const [allOffersList, setAllOffersList] = useState([]);
  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/offer/get-all", {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        setAllOffersList(data?.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [UserToken]);
  const [currentSingleOffer, setCurrentSingleOffer] = useState(null);


  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/offer/get-all", {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      });

      setAllOffersList(data?.data);
    })();
  }, []);

  console.log("offers are ", allOffersList);

  const openAddOfferPopUp = () => {
    setAddOfferPopUp(true);
  };

  const closeAddOfferPopUp = () => {
    setAddOfferPopUp(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <CardWrapper
          header_name="Offers"
          value={allOffersList.length}
          button_name="Create Offers"
          button_function={openAddOfferPopUp}
          className="h-[120px]"
          firstChildClasses="h-full"
        />
        <OfferList allOffersList={allOffersList} />
      </div>
      {addOfferPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded">
            <AddOffer
              setAddOfferPopUp={setAddOfferPopUp}
              setAllOffersList={setAllOffersList}
            />
            <button onClick={closeAddOfferPopUp}>Close</button>
          </div>
        </div>
      {currentSingleOffer ? (
        <SingleOffer currentSingleOffer={currentSingleOffer}></SingleOffer>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <CardWrapper
              header_name={"Offers"}
              value={allOffersList?.length}
              button_name={"Create Offers"}
              button_function={openAddOfferPopUp}
              className="h-[120px]"
              firstChildClasses="h-full"
            ></CardWrapper>
            <OfferList allOffersList={allOffersList} setCurrentSingleOffer={setCurrentSingleOffer}
            setAllOffersList = {setAllOffersList}></OfferList>
          </div>
          {addOfferPopUp && (
            <AddOffer
              setAddOfferPopUp={setAddOfferPopUp}
              setAllOffersList={setAllOffersList}
            ></AddOffer>
          )}
        </>
      )}
    </>
  );
};

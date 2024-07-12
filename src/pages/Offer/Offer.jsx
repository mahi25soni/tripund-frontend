import React, { useEffect, useState } from "react";
import { OfferList } from "../../components/OfferList";
import { AddOffer } from "../../components/AddOffer";
import CardWrapper from "../../atoms/CardWrapper";
import axios from "../../../axios.jsx"

export const Offer = () => {
  const [addOfferPopUp, setAddOfferPopUp] = useState(false);
  const [allOffersList, setAllOffersList] = useState([])

  const UserToken = localStorage.getItem("token")


  useEffect(() => {
    (async() => {

      const {data} = await axios.get("/offer/get-all", {
        headers : {
            "Authorization" : "Bearer " + UserToken
        }
    })

    setAllOffersList(data?.data)
    })()
  }, [])

  console.log("offers are ", allOffersList)


  const openAddOfferPopUp = () => {
    setAddOfferPopUp(true);
  };

  return (
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
        <OfferList allOffersList={allOffersList}></OfferList>
      </div>
      {}
      {addOfferPopUp && <AddOffer
      setAddOfferPopUp = {setAddOfferPopUp}
      setAllOffersList = {setAllOffersList}
      ></AddOffer>}
    </>
  );
};

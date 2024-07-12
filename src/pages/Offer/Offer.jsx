import React, { useState } from "react";
import { OfferList } from "../../components/OfferList";
import { AddOffer } from "../../components/AddOffer";
import CardWrapper from "../../atoms/CardWrapper";

export const Offer = () => {
  const [addOfferPopUp, setAddOfferPopUp] = useState(false);

  const openAddOfferPopUp = () => {
    setAddOfferPopUp(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <CardWrapper
          header_name={"Offers"}
          value={"5"}
          button_name={"Create Offers"}
          button_function={openAddOfferPopUp}
          className="h-[120px]"
          firstChildClasses="h-full"
        ></CardWrapper>
        <OfferList></OfferList>
      </div>
      {}
      {addOfferPopUp && <AddOffer></AddOffer>}
    </>
  );
};

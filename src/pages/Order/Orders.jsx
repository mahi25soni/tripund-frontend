import React, { useState } from "react";
import { OverallOrders } from "../../components/OverallOrders";
import { OrdersList } from "../../components/OrdersList";
import OrderDetails  from "./OrderDetails";

export const Orders = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(null);

  console.log("the thing is ", openOrderDetails);

  return (
    <>
      <div className="h-screen flex flex-col gap-5">
        {openOrderDetails ? (
          <OrderDetails
            Order={openOrderDetails}
            setOpenOrderDetails={setOpenOrderDetails}
          ></OrderDetails>
        ) : (
          <>
            <OverallOrders></OverallOrders>
            <OrdersList setOpenOrderDetails={setOpenOrderDetails}></OrdersList>
          </>
        )}
      </div>
    </>
  );
};

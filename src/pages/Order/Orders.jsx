import React, { useState, useEffect } from "react";
import { OverallOrders } from "../../components/Orders/OverallOrders";
import { OrdersList } from "../../components/Orders/OrdersList";
import OrderDetails from "./OrderDetails";
import axios from "../../../axios";
import { SearchFilter } from "../../components/Orders/OrderFilter";


export const Orders = () => {
  const [openOrderDetails, setOpenOrderDetails] = useState(null);
  const [orderCounts, setOrderCounts] = useState({
    totalOrders: 0,
    pending: 0,
    packing: 0,
    outForDelivery: 0,
    cancelled: 0,
  });
  

  const fetchOrderCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authorization token is missing.");
        return;
      }
      const response = await axios.get("/orders/status-counts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrderCounts(response.data.data);
      } else {
        console.error("Failed to fetch order counts:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching order counts:", error);
    }
  };


  useEffect(() => {
    fetchOrderCounts(); 
  }, []);


  const updateOrderCounts = () => {
    fetchOrderCounts(); 
  };



  return (
    <div className="flex flex-col gap-5 ">
      {openOrderDetails ? (
        <OrderDetails
          Order={openOrderDetails}
          setOpenOrderDetails={setOpenOrderDetails}
        />
      ) : (
        <>
          <OverallOrders orderCounts={orderCounts} updateOrderCounts={updateOrderCounts} />
          <OrdersList setOpenOrderDetails={setOpenOrderDetails} updateOrderCounts={updateOrderCounts} />
        </>
      )}
    </div>
  );
};

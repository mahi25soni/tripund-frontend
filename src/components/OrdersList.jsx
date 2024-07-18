import React, { useState } from "react";

const orders = [
    {
      _id: "1",
      customer: "John Doe",
      orderValue: "$250",
      quantity: 5,
      orderId: "ORD123456",
      receivingDate: "2024-07-20",
      status: "Shipped"
    },
    {
      _id: "2",
      customer: "Jane Smith",
      orderValue: "$120",
      quantity: 2,
      orderId: "ORD123457",
      receivingDate: "2024-07-18",
      status: "Processing"
    },
    {
      _id: "3",
      customer: "Michael Johnson",
      orderValue: "$300",
      quantity: 10,
      orderId: "ORD123458",
      receivingDate: "2024-07-22",
      status: "Delivered"
    },
    {
      _id: "4",
      customer: "Emily Davis",
      orderValue: "$75",
      quantity: 1,
      orderId: "ORD123459",
      receivingDate: "2024-07-19",
      status: "Pending"
    },
    {
      _id: "5",
      customer: "William Brown",
      orderValue: "$450",
      quantity: 7,
      orderId: "ORD123460",
      receivingDate: "2024-07-21",
      status: "Cancelled"
    }
  ];
  

export const OrdersList = ({setOpenOrderDetails}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);



  const handleOpenOrderDetails = (orderId) => {
    orders?.map(element => {
        if(element._id === orderId) {
            setOpenOrderDetails(element)
            return element
        }
    })
  }


  return (
    <div className="bg-white p-4 rounded-lg flex-grow">
      <div className="flex justify-between items-center">
        <div className="text-xl font-medium">Orders</div>

        <button className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
          Filters
        </button>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between border-b-2 text-center font-medium text-sm text-gray-400  p-1">
          <h6 className="w-1/2 py-1">Customer</h6>
          <h6 className="w-1/2 py-1">Order Value</h6>
          <h6 className="w-1/2 py-1">Quantity</h6>
          <h6 className="w-1/2 py-1">Order ID</h6>
          <h6 className="w-1/2 py-1">Receiving Date</h6>
          <h6 className="w-1/2 py-1">Status</h6>
          <h6 className="w-1/2 py-1"></h6>
        </div>

        {orders?.map((order, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-between border-b-2 text-center font-medium p-1"
            >
              <p className="w-1/2 py-1">{order.customer}</p>
              <p className="w-1/2 py-1">{order.orderValue}</p>
              <p className="w-1/2 py-1">{order.quantity}</p>
              <p className="w-1/2 py-1">{order.orderId}</p>
              <p className="w-1/2 py-1">{order.receivingDate}</p>
              <p className="w-1/2 py-1">{order.status}</p>
              <div className="w-1/2 py-1 ">
              <button className="rounded-3xl bg-blue-200 text-blue-600 border-none w-[130px]" onClick={() => handleOpenOrderDetails(order?._id)} >
                    View Order List
              </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <button
          className="border-2 border-gray-400 rounded py-2 px-4"
          disabled={currentPage == 1 ? true : false}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </button>
        <p className="text-sm font-normal">Page {currentPage} of 10</p>
        <button
          className="border-2 border-gray-400 rounded py-2 px-4"
          disabled={currentPage == totalPages ? true : false}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

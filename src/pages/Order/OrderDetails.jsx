import React from "react";
import maggiUrl from "../../assets/maggi_image.jpg";

const Order = {
  _id: "5",
  customer: "William Brown",
  orderValue: "$450",
  quantity: 7,
  orderId: "ORD123460",
  receivingDate: "2024-07-21",
  status: "Cancelled",
};

const products = [
  {
    _id: "1",
    product_name: "Apples",
    price: 3.5,
    quantity_of_product: 50,
    number_of_item: "ITEM001",
  },
  {
    _id: "2",
    product_name: "Bananas",
    price: 1.2,
    quantity_of_product: 100,
    number_of_item: "ITEM002",
  },
  {
    _id: "3",
    product_name: "Carrots",
    price: 2.0,
    quantity_of_product: 80,
    number_of_item: "ITEM003",
  },
  {
    _id: "4",
    product_name: "Milk",
    price: 1.5,
    quantity_of_product: 30,
    number_of_item: "ITEM004",
  },
  {
    _id: "5",
    product_name: "Bread",
    price: 2.5,
    quantity_of_product: 60,
    number_of_item: "ITEM005",
  },
];

export const OrderDetails = () => {
  return (
    <>
      <div className="flex justify-evenly bg-white  p-4 mb-2 rounded-lg items-center h-32">
        <div>
          <p className="text-sm">OrderId</p>
          <p className="font-bold">{Order?.orderId}</p>
        </div>

        <div>
          <p className="text-sm">Ordered By</p>
          <p className="font-bold">{Order?.customer}</p>
        </div>

        <div>
          <p className="text-sm">Quantity</p>
          <p className="font-bold">{Order?.quantity}</p>
        </div>

        <div>
          <p className="text-sm">orderValue</p>
          <p className="font-bold">{Order?.orderValue}</p>
        </div>

        <div>
          <p className="text-sm">Ordered At</p>
          <p className="font-bold">{Order?.receivingDate}</p>
        </div>

        <div>
          <p className="text-sm">Status</p>
          <p className="font-bold">{Order?.status}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg w-[600px]">
        <div className="text-xl font-medium">Orders</div>

        <div className="my-4 flex flex-col gap-2    ">
          {products?.map((product, index) => {
            return (
              <div key={index} className="grid grid-cols-3 h-20 text-center">
                <div className="flex items-center gap-4">
                  <img
                    src={maggiUrl}
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "4px",
                    }}
                  />

                  <div>
                    <p className="font-semibold">{product.product_name}</p>
                    <p className="text-sm font-normal">
                      Rs {product.price} <span>{" | "}</span>{" "}
                      {product.quantity_of_product}Kg
                    </p>
                  </div>
                </div>
                <div className="flex justify-end items-center text-sm font-medium gap-1">
                  <p>Order value </p>
                  <p className="h-[22px] w-[50px] bg-green-200 text-green-500 rounded-md ">
                    Rs {product.price * product.quantity_of_product}
                  </p>
                </div>
                <div className="flex justify-end items-center text-sm font-medium gap-1">
                  <p>Quantity </p>
                  <p className=" h-[22px] w-[22px] bg-green-200 text-green-500 rounded-full ">
                    {product.quantity_of_product}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

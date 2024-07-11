import React, { useEffect, useState } from "react";
import { ListProduct } from "../pages/Inventory/ListProduct";
import axios from "../../axios.jsx";
import moment from "moment";

export const InventoryCatelogue = () => {
  const sampleData = [
    {
      product: "Apple",
      buyingPrice: "$2.00",
      quality: "High",
      thresholdValue: "10",
      expiryDate: "2024-07-15",
      availability: "In Stock",
    },
    {
      product: "Banana",
      buyingPrice: "$1.50",
      quality: "Medium",
      thresholdValue: "20",
      expiryDate: "2024-06-30",
      availability: "In Stock",
    },
    {
      product: "Carrot",
      buyingPrice: "$0.80",
      quality: "High",
      thresholdValue: "15",
      expiryDate: "2024-07-10",
      availability: "In Stock",
    },
    {
      product: "Detergent",
      buyingPrice: "$5.00",
      quality: "High",
      thresholdValue: "5",
      expiryDate: "2025-01-01",
      availability: "Out of Stock",
    },
    {
      product: "Eggs",
      buyingPrice: "$3.00",
      quality: "Medium",
      thresholdValue: "30",
      expiryDate: "2024-06-25",
      availability: "In Stock",
    },
    {
      product: "Flour",
      buyingPrice: "$4.00",
      quality: "High",
      thresholdValue: "20",
      expiryDate: "2024-08-01",
      availability: "In Stock",
    },
  ];

  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const [storeProductList, setStoreProductList] = useState([]);

  const UserToken = localStorage.getItem("token");

  console.log("insdie out ", UserToken);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/storedata/get-store-inventory/", {
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });

      console.log("data from ", data);

      setStoreProductList(data?.data);
    })();
  }, []);

  return (
    <>
      <div className="bg-white p-4 rounded-lg flex-grow">
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium">Products</div>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700"
              onClick={() => setAddProductPopUp(!addProductPopUp)}
            >
              Add Product
            </button>
            <button className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
              Filters
            </button>
            <button className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
              Download All
            </button>
          </div>
        </div>

        <div className="my-4">
          <div className="flex items-center justify-between border-b-2 text-center font-medium text-sm text-gray-400  p-1">
            <h6 className="w-1/2 py-1">Products</h6>
            <h6 className="w-1/2 py-1">Buying Price</h6>
            <h6 className="w-1/2 py-1">Quantity</h6>
            <h6 className="w-1/2 py-1">Threhold Value</h6>
            <h6 className="w-1/2 py-1">Expiry Date</h6>
            <h6 className="w-1/2 py-1">Availability</h6>
          </div>

          {storeProductList?.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between border-b-2 text-center font-medium p-1"
              >
                <p className="w-1/2 py-1">{item?.product_name}</p>
                <p className="w-1/2 py-1">{item?.product_mrp}</p>
                <p className="w-1/2 py-1">{item?.product_quantity}</p>
                <p className="w-1/2 py-1">{item?.threshold_value}</p>
                <p className="w-1/2 py-1">
                  {moment(item?.nearest_expiry_date).format("DD/MM/YYYY")}
                </p>
                <p className="w-1/2 py-1">{item?.availability}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <button className="border-2 border-gray-400 rounded py-2 px-4">
            Previous
          </button>
          <p className="text-sm font-normal">Page 1 of 10</p>
          <button className="border-2 border-gray-400 rounded py-2 px-4">
            Next
          </button>
        </div>
      </div>
      {addProductPopUp && (
        <ListProduct 
        setStoreProductList={setStoreProductList}
        setAddProductPopUp = {setAddProductPopUp}
        ></ListProduct>
      )}
    </>
  );
};

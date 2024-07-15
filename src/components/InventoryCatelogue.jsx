import React, { useEffect, useState } from "react";
import { ListProduct } from "../pages/Inventory/ListProduct";
import axios from "../../axios.jsx";
import moment from "moment";

export const InventoryCatelogue = () => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const [storeProductList, setStoreProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const UserToken = localStorage.getItem("token");

  console.log("insdie out ", UserToken);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/storedata/get-store-inventory/${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      console.log("data from ", data);

      setStoreProductList(data?.data?.entire_inventory);
      setTotalPages(data?.data?.total_pages)
    })();
  }, [currentPage]);

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
            <h6 className="w-1/2 py-1">Units</h6>
            <h6 className="w-1/2 py-1">Threshold Value</h6>
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
                <p className="w-1/2 py-1">{item?.units}</p>

                <p className="w-1/2 py-1">{item?.threshold_value}</p>
                <p className="w-1/2 py-1">
                  {moment(item?.nearest_expiry_date).format("DD/MM/YYYY")}
                </p>
                <p className="w-1/2 py-1">
                  {item?.units > item?.threshold_value ? (
                    <span className="font-bold text-green-600">In-Stock</span>
                  ) : (
                    <span className="font-bold text-red-600">Out of stock</span>
                  )}
                </p>
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
      {addProductPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg ">

        <ListProduct
          setStoreProductList={setStoreProductList}
          setAddProductPopUp={setAddProductPopUp}
        ></ListProduct>
        </div>
        </div>
      )}
    </>
  );
};

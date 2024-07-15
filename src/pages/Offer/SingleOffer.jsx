import React, { useState, useEffect } from "react";
import moment from "moment";
import { FiBell, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import axios from "../../../axios.jsx";

export const SingleOffer = ({currentSingleOffer}) => {
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const [storeProductList, setStoreProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [isChecked, setIsChecked] = useState({});

  const handleCheckboxChange = (product_id) => {
    setIsChecked((prev) => ({ ...prev, [product_id]: !prev[product_id] }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search action here, e.g., navigate to a search results page
    console.log("Search query:", searchQuery);
  };
  const UserToken = localStorage.getItem("token");



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
      setTotalPages(data?. data?.total_pages);
    })();
  }, [currentPage]);

  console.log("The current offer is ", currentSingleOffer)
  return (
    <>
      <div className="flex flex-col gap-4 z-10">
        <div className={`bg-white h-[120px] px-8 rounded-lg w-full `}>
          <div
            className={`flex h-full flex-row justify-between items-center font-semibold text-xl`}
          >
            <div className="flex flex-col justify-between gap-2 items-center">
              <div className="text-green-500 bg-green-200 font-bold p-2 rounded-md">
              {currentSingleOffer?.offer_discount}%
              </div>
              <p>{currentSingleOffer?.offer_heading}</p>
            </div>
            <div className="flex flex-col justify-between gap-2  items-center">
              <div className="text-orange-500 bg-orange-200 px-2.5 py-1 inline rounded-md font-bold">
                15
              </div>
              <p>Products</p>
            </div>
            <div className="flex flex-col justify-between gap-2  items-center">
              <p>Validity</p>
              <p>{moment(currentSingleOffer?.end_date).format('DD MMMM YYYY')}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg flex-grow">
          <div className="flex justify-between items-center">
            <div className="flex relative">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2.5 w-[745px] border-2 border-gray-300 rounded-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-4 text-gray-500 border-l-2 w-6 pl-1"
                >
                  <FiSearch className="htext-lg" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2.5  border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
                Filters
              </button>
              <button className="px-4 py-2.5  border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
                Apply Offer
              </button>
            </div>
          </div>

          <div className="my-4">
            <div className="flex items-center justify-between border-b-2 text-center font-medium text-sm text-gray-400  p-1">
              <h6></h6>
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
                  <div className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-4 rounded flex items-center justify-center border-blue-300 bg-white"
                      checked={!!isChecked[item?._id]}
                      onChange={() => handleCheckboxChange(item?._id)}
                    />
                  </div>
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
                      <span className="font-bold text-red-600">
                        Out of stock
                      </span>
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
      </div>
    </>
  );
};

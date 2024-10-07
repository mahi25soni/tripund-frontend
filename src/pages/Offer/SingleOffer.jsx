import React, { useState, useEffect } from "react";
import moment from "moment";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5"; // Import a back arrow icon
import axios from "../../../axios.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SingleOffer = ({ currentSingleOffer, onClose }) => {
  const [storeProductList, setStoreProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [selectAll, setSelectAll] = useState(false); // To track select all state
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const UserToken = localStorage.getItem("token");

  // Fetch products on page load and page change
  useEffect(() => {
    fetchProducts();
  }, [currentPage, currentSingleOffer]);

  // Function to fetch products from the server
  const fetchProducts = async () => {
    setLoading(true); // Start loading

    const { data } = await axios.get(
      `/offer/get-all-products-of-offer/${currentSingleOffer?._id}/${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      }
    );

    const productList = data?.data?.entireList;

    // Set checked state for products
    const checkedState = {};
    productList?.map((item) => {
      checkedState[item?._id] = item?.discount;
    });

    setIsChecked(checkedState);
    setStoreProductList(productList);
    setFilteredProducts(productList); // Set filtered products initially
    setTotalPages(data?.data?.total_pages);
    setLoading(false); // End loading
  };

  // Search handler to filter products based on each keystroke
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = storeProductList?.filter((product) =>
      product?.product_name?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle individual checkbox toggle
  const handleCheckboxChange = (product_id) => {
    setIsChecked((prev) => ({ ...prev, [product_id]: !prev[product_id] }));
  };

  // Handle the "Select All" checkbox
  const handleSelectAll = () => {
    const updatedChecked = {};
    filteredProducts.forEach((product) => {
      updatedChecked[product?._id] = !selectAll; // Toggle all products
    });
    setIsChecked(updatedChecked);
    setSelectAll(!selectAll); // Toggle select all state
  };

  // Handle applying the selected products
  // Handle applying the selected products
const handleAddTickedProduct = async () => {
  const selectedProducts = [];
  const deselectedProducts = [];

  // Distinguish between selected and deselected products
  Object.keys(isChecked).map((key) => {
    if (isChecked[key]) {
      selectedProducts.push({
        productId: key,
        offerId: currentSingleOffer?._id,
        discount_value: currentSingleOffer?.offer_discount,
      });
    } else {
      deselectedProducts.push({
        productId: key,
        offerId: currentSingleOffer?._id,
      });
    }
  });

  try {
    // Send selected products to add to the offer
    if (selectedProducts.length > 0) {
      await axios.post("/offer/add-product-to-offer", selectedProducts, {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      });
    }

    // Send deselected products to remove from the offer
    if (deselectedProducts.length > 0) {
      await axios.post("/offer/remove-product-from-offer", deselectedProducts, {
        headers: {
          Authorization: "Bearer " + UserToken,
        },
      });
    }

    // Show success toast notification
    toast.success("Offer updated successfully!")

    // Refetch the updated product list
    fetchProducts();
  } catch (error) {
    console.error("Error updating offer: ", error);
    
    // Show error toast notification
    toast.error("Failed to update the offer. Please try again.")
  }
};


  return (
    <>
      <div className="flex flex-col gap-4 z-10">
        <div className="bg-white h-[120px] px-8 rounded-lg w-full">
          <div className="flex h-full flex-row justify-between items-center font-semibold text-xl">
            <div className="flex flex-col justify-between gap-2 items-center">
              <div className="text-green-500 bg-green-200 font-bold p-2 rounded-md">
                {currentSingleOffer?.offer_discount}%
              </div>
              <p>{currentSingleOffer?.offer_heading}</p>
            </div>
            <div className="flex flex-col justify-between gap-2  items-center">
              <div className="text-orange-500 bg-orange-200 px-2.5 py-1 inline rounded-md font-bold">
                {currentSingleOffer?.number_of_products}
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
          <div className="flex justify-between items-center mb-4">
            <div className="flex relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2.5 w-[745px] border-2 border-gray-300 rounded-md focus:outline-none"
              />
              <span className="absolute right-2 top-4 text-gray-500 border-l-2 w-6 pl-1">
                <FiSearch className="text-lg" />
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
                Filters
              </button>
              <button
                className="px-4 py-2.5 border-2 rounded bg-blue-700 text-white hover:border-blue-700"
                onClick={handleAddTickedProduct}
              >
                Apply Offer
              </button>
              <button
                className="px-4 py-2.5 border-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center"
                onClick={handleSelectAll} // Handle select all
              >
                {selectAll ? "Deselect All" : "Select All"}
              </button>
              <button
                className="px-4 py-2.5 border-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center"
                onClick={onClose}              >
                <IoArrowBack className="h-5 w-5 mr-2" />
                Back
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              {/* Simple loader */}
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
            </div>
          ) : (
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

              {filteredProducts?.map((item, index) => (
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
                    {moment(item?.product_expiry).format("DD MMM YYYY")}
                  </p>
                  <p className="w-1/2 py-1">
                  {item?.units > item?.threshold_value ? (
                    <span className="text-green-500 font-semibold">In Stock</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Out-Of-Stock</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};

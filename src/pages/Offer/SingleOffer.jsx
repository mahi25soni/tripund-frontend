import React, { useState, useEffect } from "react";
import moment from "moment";
import { FiSearch } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import axios from "../../../axios.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner.jsx";

export const SingleOffer = ({ onClose }) => {
  const [storeProductList, setStoreProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [offerData, setOfferData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    fetchOfferData();
    fetchProducts();
  }, [id, currentPage]);

  const fetchOfferData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/offer/get-offer-by-id/${id}`, {
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });
      setOfferData(data?.data);
    } catch (error) {
      console.error("Error fetching offer data: ", error);
      toast.error("Failed to fetch offer details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/offer/get-all-products-of-offer/${id}/${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      const productList = data?.data?.entireList;

      const checkedState = {};
      productList?.forEach((item) => {
        checkedState[item?._id] = item?.discount;
      });

      setIsChecked(checkedState);
      setStoreProductList(productList);
      setFilteredProducts(productList);
      setTotalPages(data?.data?.total_pages);
    } catch (error) {
      console.error("Error fetching products: ", error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = storeProductList?.filter((product) =>
      product?.product_name
        ?.toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCheckboxChange = (product_id) => {
    setIsChecked((prev) => ({ ...prev, [product_id]: !prev[product_id] }));
  };

  const handleSelectAll = () => {
    const updatedChecked = {};
    filteredProducts.forEach((product) => {
      updatedChecked[product?._id] = !selectAll;
    });
    setIsChecked(updatedChecked);
    setSelectAll(!selectAll);
  };

  const handleAddTickedProduct = async () => {
    const selectedProducts = [];
    const deselectedProducts = [];

    Object.keys(isChecked).forEach((key) => {
      if (isChecked[key]) {
        selectedProducts.push({
          productId: key,
          offerId: offerData?._id,
          discount_value: offerData?.offer_discount,
        });
      } else {
        deselectedProducts.push({
          productId: key,
          offerId: offerData?._id,
        });
      }
    });

    try {
      if (selectedProducts.length > 0) {
        await axios.post("/offer/add-product-to-offer", selectedProducts, {
          headers: {
            Authorization: "Bearer " + UserToken,
          },
        });
      }

      if (deselectedProducts.length > 0) {
        await axios.post(
          "/offer/remove-product-from-offer",
          deselectedProducts,
          {
            headers: {
              Authorization: "Bearer " + UserToken,
            },
          }
        );
      }

      toast.success("Offer updated successfully!");
      navigate("/offers");
    } catch (error) {
      console.error("Error updating offer: ", error);
      toast.error("Failed to update the offer. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 z-10 mt-4 md:mt-0">
        {/* Back Button */}
        <button
          onClick={() => navigate("/offers")}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          <IoArrowBack size={20} />
          <span>Back to Offers</span>
        </button>

        {/* Offer Details Card */}
        <div className="bg-white h-[100px] md:h-[120px] px-6 md:px-8 rounded-lg w-full">
          <div className="flex flex-row h-full justify-between items-center font-semibold text-sm md:text-xl gap-2 md:gap-0">
            {/* Discount Section */}
            <div className="flex flex-col justify-between gap-1 items-center">
              <div className="text-green-500 bg-green-200 font-bold p-1 md:p-2 rounded-md text-xs md:text-base">
                {offerData?.offer_discount}%
              </div>
              <p className="text-center text-xs md:text-base">
                {offerData?.offer_heading}
              </p>
            </div>

            {/* Products Section */}
            <div className="flex flex-col justify-between gap-1 items-center">
              <div className="text-orange-500 bg-orange-200 px-1.5 md:px-2.5 py-1 inline rounded-md font-bold text-xs md:text-base">
                {offerData?.number_of_products}
              </div>
              <p className="text-center text-xs md:text-base">Products</p>
            </div>

            {/* Validity Section */}
            <div className="flex flex-col justify-between gap-1 items-center">
              <p className="text-center text-xs md:text-base">Validity</p>
              <p className="text-center text-xs md:text-base">
                {moment(offerData?.end_date).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:bg-white lg:shadow-md p-4 rounded-lg flex-grow">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-4">
            <div className="flex relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2.5 w-full border-2 border-gray-300 rounded-md focus:outline-none"
              />
              <span className="absolute right-2 top-4 text-gray-500 border-l-2 w-6 pl-1">
                <FiSearch className="text-lg" />
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-2 w-full lg:w-auto">
              <button
                className="px-4 py-2.5 border-2 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center w-full"
                onClick={handleSelectAll}
              >
                {selectAll ? "Deselect All" : "Select All"}
              </button>
              <button
                className="px-4 py-2.5 border-2 rounded bg-blue-700 text-white hover:border-blue-700 w-full"
                onClick={handleAddTickedProduct}
              >
                Apply Offer
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden lg:block my-4">
                <div className="flex items-center justify-between border-b-2 text-center font-medium text-sm text-gray-400 p-1">
                  <h6></h6>
                  <h6 className="w-1/2 py-1">Products</h6>
                  <h6 className="w-1/2 py-1">MRP</h6>
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
                    <p className="w-1/2 py-1">{item?.total_stock}</p>
                    <p className="w-1/2 py-1">{item?.threshold_stock}</p>
                    <p className="w-1/2 py-1">
                      {moment(item?.product_expiry).format("DD MMM YYYY")}
                    </p>
                    <p className="w-1/2 py-1">
                      {item?.total_stock > item?.threshold_stock ? (
                        <span className="text-green-500 font-semibold">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Out-Of-Stock
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile View */}
              <div className="lg:hidden my-4 grid grid-cols-1 gap-4">
                {filteredProducts?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-300 bg-white border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-semibold text-lg text-blue-700 break-words">
                        {item?.product_name}
                      </p>
                      <div className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border-4 rounded flex items-center justify-center border-blue-300 bg-white"
                          checked={!!isChecked[item?._id]}
                          onChange={() => handleCheckboxChange(item?._id)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 mb-4">
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">MRP</span>
                        <span className="font-medium">{item?.product_mrp}</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Quantity</span>
                        <span className="font-medium">
                          {item?.product_quantity}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Units</span>
                        <span className="font-medium">{item?.total_stock}</span>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">
                          Threshold Value
                        </span>
                        <span className="font-medium">
                          {item?.threshold_stock}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">
                          Expiry Date
                        </span>
                        <span className="font-medium">
                          {moment(item?.product_expiry).format("DD MMM YYYY")}
                        </span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">
                          Availability
                        </span>
                        <span
                          className={`font-medium ${
                            item?.total_stock > item?.threshold_stock
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item?.total_stock > item?.threshold_stock
                            ? "In Stock"
                            : "Out-Of-Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

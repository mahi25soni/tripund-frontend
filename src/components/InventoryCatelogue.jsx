import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListProduct } from "../pages/Inventory/ListProduct";
import axios from "../../axios.jsx";
import Spinner from "../components/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BsEye } from "react-icons/bs";
import DeleteAlertPopup from "../atoms/DeleteAlertPopup.jsx";
import { ProductFilter } from "../pages/Inventory/ProductFilter.jsx";

export const InventoryCatelogue = () => {
  const [storeProductList, setStoreProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addProductPopUp, setAddProductPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const UserToken = localStorage.getItem("token");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/storedata/get-store-inventory?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      setStoreProductList(data?.data?.entire_inventory || []);
      setTotalPages(data?.data?.total_pages || 1);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
      setShouldRefetch(false);
    }
  }, [currentPage, UserToken]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, shouldRefetch]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!searchParams || Object.keys(searchParams).length === 0) {
        setFilteredProducts([]);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/storedata/filter-store-inventory", {
          headers: { Authorization: `Bearer ${token}` },
          params: searchParams,
        });

        setFilteredProducts(response?.data?.products || []);
        setTotalPages(response.data?.pagination?.totalPages || 1);
        if (response.data.products && response.data.products.length === 0) {
          toast.warning("No Product for this filter");
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
      }
    };

    fetchFilteredProducts();
  }, [searchParams]);

  const handleSearchChange = (updatedParams) => {
    setSearchParams((prev) => ({ ...prev, ...updatedParams, page: 1 }));
  };

  const displayedProducts = filteredProducts.length > 0 ? filteredProducts : storeProductList;

  const handleProductClick = (productId) => {
    navigate(`/inventory/product/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/inventory/edit-product/${productId}`);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/storedata/delete-store-product/${selectedProductId}`, {
        headers: {
          Authorization: `Bearer ${UserToken}`,
        },
      });

      setStoreProductList((prevList) =>
        prevList.filter((product) => product._id !== selectedProductId)
      );
      setIsPopupOpen(false);
      toast.success("Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete!");
    }
  };

  const openDeletePopup = (productId) => {
    setSelectedProductId(productId);
    setIsPopupOpen(true);
  };

  const handleProductAdded = useCallback((newProduct) => {
    setStoreProductList(prevList => [newProduct, ...prevList]);
    setAddProductPopUp(false);
    setShouldRefetch(true); // Trigger a refetch to ensure data consistency
  }, []);

  return (
    <>
      <div className="xl:p-2 rounded-lg flex-grow h-full">
        <ToastContainer />
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
          <div className="text-xl font-medium">Products</div>
          <div className="flex flex-col lg:items-center md:flex-row gap-4 w-full md:w-auto">
            <ProductFilter onSearchChange={handleSearchChange} />
            <button
              className="px-2 py-2 border-2 lg:h-fit rounded bg-blue-700 text-white hover:bg-blue-800 transition duration-300 w-full md:w-auto text-md"
              onClick={() => setAddProductPopUp(!addProductPopUp)}
            >
              Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : storeProductList.length === 0 && filteredProducts.length === 0 ? (
          <p className="text-center py-4 text-gray-500 h-92">
            No products listed, add now!
          </p>
        ) : (
          <>
            <div className="hidden lg:block my-4">
              <div className="flex items-center justify-between border-b-2 text-left font-medium text-sm text-gray-400 p-1">
                <h6 className="w-3/6 py-1">Products</h6>
                <h6 className="w-1/6 py-1">MRP</h6>
                <h6 className="w-1/6 py-1">Quantity</h6>
                <h6 className="w-1/6 py-1">Total Stock</h6>
                <h6 className="w-1/6 py-1">Category</h6>
                <h6 className="w-1/6 py-1">Availability</h6>
                <h6 className="w-1/6 py-1">Actions</h6>
              </div>

              {displayedProducts?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b-2 text-left font-medium p-1 cursor-pointer hover:bg-gray-50 transition duration-300"
                >
                  <p className="w-3/6 py-1">{item?.product_name}</p>
                  <p className="w-1/6 py-1">₹{item?.product_mrp}</p>
                  <p className="w-1/6 py-1">{item?.product_quantity}</p>
                  <p className="w-1/6 py-1">{item?.total_stock}</p>
                  <p className="w-1/6 py-1">{item?.product_category?.name}</p>
                  <p className="w-1/6 py-1">
                    {item?.total_stock > item?.threshold_stock ? (
                      <span className="font-bold text-green-600">In-Stock</span>
                    ) : (
                      <span className="font-bold text-red-600">Out of stock</span>
                    )}
                  </p>
                  <div className="w-1/6 flex justify-start gap-4">
                    <BiPencil
                      className="text-green-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleEditProduct(item._id)}
                    />
                    <MdDelete
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => openDeletePopup(item._id)}
                    />
                    <BsEye
                      className="text-blue-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleProductClick(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:hidden my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedProducts?.map((item, index) => (
                <div
                  key={index}
                  className="w-full rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition duration-300 bg-white border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <p className="font-semibold text-lg text-blue-700 break-words">
                      {item?.product_name}
                    </p>
                    <div className="flex gap-3">
                      <BiPencil
                        className="text-green-600 cursor-pointer hover:text-blue-800"
                        onClick={() => handleEditProduct(item._id)}
                      />
                      <MdDelete
                        className="text-red-600 cursor-pointer hover:text-red-800"
                        onClick={() => openDeletePopup(item._id)}
                      />
                      <BsEye
                        className="text-blue-600 cursor-pointer hover:text-red-800"
                        onClick={() => handleProductClick(item._id)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">MRP</span>
                        <span className="font-medium">₹{item?.product_mrp}</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Quantity</span>
                        <span className="font-medium">{item?.product_quantity}</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Total Stock</span>
                        <span className="font-medium">{item?.total_stock}</span>
                      </div>
                    </div>

                    <div className="flex justify-between gap-2">
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Category</span>
                        <span className="font-medium">{item?.product_category?.name}</span>
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-sm text-gray-500">Availability</span>
                        <span
                          className={`font-medium ${
                            item?.total_stock > item?.threshold_stock
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item?.total_stock > item?.threshold_stock
                            ? "In-Stock"
                            : "Out of stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                className="border-2 border-gray-400 rounded py-2 px-4 hover:bg-gray-100 transition duration-300"
                disabled={currentPage === 1 || displayedProducts.length === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <p className="text-sm font-normal">
                Page {currentPage} of {totalPages}
              </p>
              <button
                className="border-2 border-gray-400 rounded py-2 px-4 hover:bg-gray-100 transition duration-300"
                disabled={currentPage === totalPages || displayedProducts.length === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {addProductPopUp && (
        <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
          <div className="bg-white h-screen p-2 rounded-lg overflow-auto relative w-full md:w-3/4 lg:w-1/2">
            <button
              className="relative top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => setAddProductPopUp(false)}
            >
              Close
            </button>
            <ListProduct onProductAdded={handleProductAdded} />
          </div>
        </div>
      )}

      <DeleteAlertPopup
        isOpen={isPopupOpen}
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteProduct}
        onCancel={() => setIsPopupOpen(false)}
      />
    </>
  );
};
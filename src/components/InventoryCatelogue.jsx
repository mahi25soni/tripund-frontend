import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListProduct } from "../pages/Inventory/ListProduct";
import axios from "../../axios.jsx";
import moment from "moment";
import Spinner from "../components/Spinner"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaTrashAlt, FaEdit } from "react-icons/fa"; 
import DeleteAlertPopup from "../atoms/DeleteAlertPopup.jsx";
import { showToast } from "../atoms/Toast.jsx";
import { ProductFilter } from "../pages/Inventory/ProductFilter.jsx";
import { BiPencil } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { BsEye, BsViewList } from "react-icons/bs";

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

  useEffect(() => {
    (async () => {
      try {
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
      }
    })();
  }, [currentPage, UserToken]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (!searchParams || Object.keys(searchParams).length === 0) {
        console.log("No search parameters, skipping API call.");
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
        
          setFilteredProducts(response?.data?.products);
          setTotalPages(response.data?.pagination?.totalPages);
        if(response.data.products.length === 0){
          showToast("No Product for this filter",'warning')
        }


      } catch (error) {
        console.error('Error fetching filtered products:', error);
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
      showToast('Deleted Successfully!', 'success')


    } catch (error) {
      console.error("Error deleting product:", error);
      showToast('Failed to delete!', 'error')

    }
  };

  const openDeletePopup = (productId) => {
    console.log('Product Id for delete:', productId)
    setSelectedProductId(productId);
    setIsPopupOpen(true);
  };


  
  return (
    <>
      <div className="bg-white p-4 rounded-lg flex-grow h-full">
        <div className="flex justify-between items-center">
          <div className="text-xl font-medium">Products</div>
          <div className="flex items-center gap-2">
          <ProductFilter onSearchChange={handleSearchChange}/>
            <button
              className="px-4 py-2.5 border-2 rounded bg-blue-700 text-white hover:border-blue-700"
              onClick={() => setAddProductPopUp(!addProductPopUp)}
            >
              Add Product
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : storeProductList.length === 0 ? (
          <p className="text-center py-4 text-gray-500 h-92">
            No products listed, add now!
          </p>
        ) : (
          <>
            <div className="my-4">
              <div className="flex items-center justify-between border-b-2 text-left font-bold text-md text-gray-600 p-1 font-Mont">
                <h6 className="w-1/6 py-1">Products</h6>
                <h6 className="w-1/6 py-1">MRP</h6>
                <h6 className="w-1/6 py-1">Quantity</h6>
                <h6 className="w-1/6 py-1">Total Stock</h6>
                <h6 className="w-1/6 py-1">Threshold Stock</h6>
                <h6 className="w-1/6 py-1">Category</h6>
                <h6 className="w-1/6 py-1">Availability</h6>
                <h6 className="w-1/6 py-1">Actions</h6> 
              </div>

              {displayedProducts?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b-2 text-left font-medium p-1 cursor-pointer"
                >
                  <p className="w-1/6 py-1" >
                    {item?.product_name}
                  </p>
                  <p className="w-1/6 py-1">{item?.product_mrp}</p>
                  <p className="w-1/6 py-1">{item?.product_quantity}</p>
                  <p className="w-1/6 py-1">{item?.total_stock}</p>
                  <p className="w-1/6 py-1">{item?.threshold_stock}</p>
                  <p className="w-1/6 py-1">{item?.product_category?.name}</p>
                  <p className="w-1/6 py-1">
                    {item?.total_stock > item?.threshold_stock ? (
                      <span className="font-bold text-green-600">In-Stock</span>
                    ) : (
                      <span className="font-bold text-red-600">Out of stock</span>
                    )}
                  </p>
                  <div className="w-1/6 flex justify-start gap-4">
                  <div className="p-2 border rounded-md">
                  <BiPencil
                      className="text-green-600 cursor-pointer hover:text-blue-800"
                      onClick={() => handleEditProduct(item._id)} 
                    />
                  </div>
                    <div className="p-2 border rounded-md">
                    <MdDelete
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      onClick={() => openDeletePopup(item._id)}
                      />
                    </div>
                    <div className="p-2 border rounded-md">
                    <BsEye
                      className="text-blue-600 cursor-pointer hover:text-red-800"
                      onClick={() => handleProductClick(item._id)}
                      />
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                className="border-2 border-gray-400 rounded py-2 px-4"
                disabled={currentPage === 1 || storeProductList.length === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <p className="text-sm font-normal">
                Page {currentPage} of {totalPages}
              </p>
              <button
                className="border-2 border-gray-400 rounded py-2 px-4"
                disabled={currentPage === totalPages || storeProductList.length === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {addProductPopUp && (
        <div className="fixed inset-0 flex h-screen items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto ">
          <div className="bg-white h-screen p-2 rounded-lg overflow-auto relative">
            <button
              className="relative top-4 right-4 bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => setAddProductPopUp(false)}
            >
              Close
            </button>

            <ListProduct
              setStoreProductList={setStoreProductList}
              setAddProductPopUp={setAddProductPopUp}
              onProductAdded={(prevList) => {
                setStoreProductList((prevList) =>
        prevList.filter((product) => product._id !== selectedProductId)
      );                setAddProductPopUp(false); 
              }}
            />
          </div>
          
        </div>
      )}
      <div>
      <DeleteAlertPopup
        isOpen={isPopupOpen}
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDeleteProduct}
        onCancel={() => setIsPopupOpen(false)}
      />
      </div>
      <ToastContainer />

    </>
  );
};

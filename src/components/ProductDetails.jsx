import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios.jsx";
import Spinner from "./Spinner.jsx";
import { FiArrowLeft, FiX } from "react-icons/fi";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const UserToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/storedata/get-store-product-by-id/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          }
        );
        setProduct(response?.data.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    })();
  }, [productId, UserToken]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  const totalPrice = (product.product_mrp * (1 + product.gst / 100)).toFixed(2);
  const finalPrice = product.discount_price || (product.product_mrp - product.discount_value);

  // Determine stock status
  const stockStatus = product.total_stock > product.threshold_stock ? "In Stock" : "Low Stock";
  const statusColor = stockStatus === "In Stock" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <FiArrowLeft className="mr-2" size={20} />
        <span className="font-medium">Back to Products</span>
      </button>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Top Section - Image and Description */}
        <div className="p-6 flex flex-col md:flex-row gap-6 border-b border-gray-200">
          {/* Image */}
          <div className="w-full md:w-1/3">
            <div 
              className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center border border-gray-200 cursor-pointer"
              onClick={() => product.product_img?.length > 0 && setSelectedImage(product.product_img[0])}
            >
              {product.product_img?.length > 0 ? (
                <img
                  src={product.product_img[0]}
                  alt="Product"
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="text-gray-400">No Image Available</div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div className="w-full md:w-2/3 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-bold text-gray-800">{product.product_name}</h1>
              
              {/* Desktop status chips (aligned right of product name) */}
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <span className={`${statusColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
                  {stockStatus}
                </span>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {product.product_category?.name}
                </span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
              Description
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {product.description || "No description available"}
            </p>
          </div>
        </div>

        {/* Cards Section - Single Row on Desktop */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Stock Details Card */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Stock Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">Total Stock</span>
                <span className="font-medium text-sm md:text-base">{product.total_stock}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">Threshold</span>
                <span className="font-medium text-sm md:text-base">{product.threshold_stock}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 text-sm md:text-base">Status</span>
                <span className={`font-medium text-sm md:text-base ${
                  product.total_stock > product.threshold_stock 
                    ? "text-green-600" 
                    : "text-red-600"
                }`}>
                  {product.total_stock > product.threshold_stock 
                    ? "In Stock" 
                    : "Low Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Price Details Card */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Price Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">MRP</span>
                <span className="font-medium text-sm md:text-base">₹{product.product_mrp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">GST</span>
                <span className="text-red-500 text-sm md:text-base">{product.gst}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 text-sm md:text-base">Total</span>
                <span className="font-medium text-sm md:text-base">₹{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Price Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">Product MRP</span>
                <span className="text-sm md:text-base">₹{product.product_mrp}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm md:text-base">GST ({product.gst}%)</span>
                <span className="text-red-500 text-sm md:text-base">+ ₹{(product.product_mrp * (product.gst / 100)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-500 py-2">
                <span className="font-medium text-sm md:text-base">Discount</span>
                <span className="text-sm md:text-base">- ₹{product.discount_value || "0"}</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between font-semibold text-gray-800">
                <span className="text-sm md:text-base">Total Amount</span>
                <span className="text-sm md:text-base">₹{product.discount_price || totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <FiX size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Product Preview" 
              className="w-full h-auto max-h-[80vh] object-contain" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
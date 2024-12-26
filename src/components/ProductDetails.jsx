import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.jsx";
import Spinner from "./Spinner.jsx";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const UserToken = localStorage.getItem("token");

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
      <div className="text-center h-screen text-gray-500">
        <Spinner />
      </div>
    );
  }

  const totalPrice = (product.product_mrp * (1 + product.gst / 100)).toFixed(2);
  const finalPrice =
    product.discount_price || (product.product_mrp - product.discount_value);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-white rounded-lg p-4">
        {/* Image and Product Information */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0">
            {product.product_img?.length > 0 ? (
              <img
                src={product.product_img[0]}
                alt="Product"
                className="rounded-lg shadow-md w-full md:w-64 h-auto object-cover"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg shadow-md w-full md:w-64 h-64 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold text-blue-800">
              {product.product_name}
            </h2>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Category:</span>{" "}
              {product.product_category?.name}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Description:</span>{" "}
              {product.description}
            </p>
          </div>
        </div>

        {/* Details Sections */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Stock, Price, and Offer Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Stock Details */}
            <div className="p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black pb-2">
                Stock Details
              </h3>
              <hr />
              <div className="text-gray-700 mt-2 space-y-1">
                <p>
                  <span className="font-medium">Total Stock:</span>{" "}
                  {product.total_stock}
                </p>
                <p>
                  <span className="font-medium">Threshold Stock:</span>{" "}
                  {product.threshold_stock}
                </p>
                <p>
                  <span className="font-medium">Stock Status:</span>{" "}
                  {product.stock_Status}
                </p>
              </div>
            </div>

            {/* Price Details */}
            <div className="p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black pb-2">
                Price Details
              </h3>
              <hr />
              <div className="text-gray-700 mt-2 space-y-1">
                <p>
                  <span className="font-medium">MRP:</span> ₹{product.product_mrp}
                </p>
                <p>
                  <span className="font-medium">GST:</span> {product.gst}%
                </p>
                <p>
                  <span className="font-medium">Total (Incl. GST):</span> ₹
                  {totalPrice}
                </p>
              </div>
            </div>

            {/* Offer Details */}
            <div className="p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-black pb-2">
                Offer Details
              </h3>
              <hr />
              <div className="text-gray-700 mt-2 space-y-1">
                <p>
                  <span className="font-medium">Discount Value:</span>{" "}
                  ₹{product.discount_value || "0"}
                </p>
                <p>
                  <span className="font-medium">Discounted Price:</span>{" "}
                  ₹{product.discount_price || "0"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Price Summary */}
          {/* Price Summary */}
<div className="p-4 rounded-lg shadow w-full  self-start">
  <h3 className="text-lg font-semibold text-black pb-2">Price Summary</h3>
  <hr className="mb-2" />
  <div className="text-gray-700 space-y-2">
    <div className="flex justify-between">
      <span className="font-medium">Product MRP:</span>
      <span>₹{product.product_mrp}</span>
    </div>
    <div className="flex justify-between">
      <span className="font-medium text-red-500">GST ({product.gst}%):</span>
      <span className="text-red-500">₹{(product.product_mrp * (product.gst / 100)).toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-green-500">
      <span className="font-medium">Discount:</span>
      <span>- ₹{product.discount_value || "0"}</span>
    </div>
    <hr className="my-2" />
    <div className="flex justify-between font-semibold text-black">
      <span>Total Amount:</span>
      <span>₹{product.discount_price || totalPrice}</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

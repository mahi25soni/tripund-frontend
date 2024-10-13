import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.jsx";
import Spinner from "./Spinner.jsx";

const ProductDetails = () => {
  const { productId } = useParams(); // Getting productId from the URL params
  const [product, setProduct] = useState(null);
  const UserToken = localStorage.getItem("token");
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image index

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

  // Function to handle next image
  const handleNextImage = () => {
    if (product && product.product_img && product.product_img.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.product_img.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to handle previous image
  const handlePrevImage = () => {
    if (product && product.product_img && product.product_img.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.product_img.length - 1 : prevIndex - 1
      );
    }
  };

  if (!product) {
    return (
      <div className="text-center h-screen text-gray-500">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white h-auto w-full p-6 rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-800">
            {product?.product_name}
          </p>
        </div>

        <div className="w-full border-t border-gray-200 mb-4"></div>

        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Primary Details
            </h1>
            <ul className="space-y-2 text-gray-600">
              <li className="justify-between">
                <span className="font-medium text-gray-700">Product Name:</span>{" "}
                <span>{product?.product_name}</span>
              </li>
              <li className="justify-between">
                <span className="font-medium text-gray-700">Product ID:</span>{" "}
                <span>{product?._id}</span>
              </li>
              <li className="justify-between">
                <span className="font-medium text-gray-700">Expiry Date:</span>{" "}
                <span>{product?.nearest_expiry_date}</span>
              </li>
              <li className="justify-between">
                <span className="font-medium text-gray-700">Threshold Value:</span>{" "}
                <span>{product?.threshold_value}</span>
              </li>
              <li className="justify-between">
                <span className="font-medium text-gray-700">MRP:</span>{" "}
                <span>{product?.product_mrp}</span>
              </li>
            </ul>
          </div>

          <div className="w-1/3 text-center">
            {product?.product_img && product.product_img.length > 0 ? (
              <div className="relative w-full h-auto border-2 border-gray-200 rounded-lg shadow-sm object-contain mb-4">
                <img
                  src={product.product_img[currentImageIndex]} // Display the current image
                  alt={`Product ${currentImageIndex}`}
                  className="w-full h-auto object-contain rounded-lg"
                />

                {/* Next and Previous buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full"
                >
                  &gt;
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No image available</p>
            )}

            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between">
                <span className="font-medium text-gray-700">Stock:</span>{" "}
                <span>{product?.units}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-gray-700">Remaining Stock:</span>{" "}
                <span>{product?.units}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

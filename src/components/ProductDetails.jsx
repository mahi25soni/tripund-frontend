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
    return <div className="text-center h-screen text-gray-500"><Spinner/></div>;
  }

  return (
    <div className="bg-white h-auto w-full p-6 rounded-lg ">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-gray-800">{product?.product_name}</p>
          <div>
          <button
            className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700"
            onClick={() => setAddProductPopUp(!addProductPopUp)}>
            Edit
          </button>{" "}
          <button
            className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700"
            onClick={() => setAddProductPopUp(!addProductPopUp)}>
            Download
          </button>
        </div>
        </div>

        {/* <div className="text-lg font-semibold text-gray-700 mb-2">Overview</div> */}

        <div className="w-full border-t border-gray-200 mb-4"></div>

        <div className="flex justify-between">
          {/* Left Section */}
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Primary Details</h1>
            <ul className="space-y-2 text-gray-600">
              <li className="justify-between "><span className="font-medium text-gray-700">Product Name:</span> <span>{product?.product_name}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">Product ID:</span> <span>{product?._id}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">Expiry Date:</span> <span>{product?.nearest_expiry_date}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">Threshold Value:</span> <span>{product?.threshold_value}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">MRP:</span> <span>{product?.product_mrp}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">Buying Price:</span> <span>{product?.product_buying_price}</span></li>
              <li className="justify-between"><span className="font-medium text-gray-700">Selling Price:</span> <span>{product?.product_mrp}</span></li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="w-1/3 text-center">
            <img src={product?.product_image_url} alt="Product" className="w-full h-auto border-2 border-gray-200 rounded-lg shadow-sm object-contain mb-4" />
            <ul className="space-y-2 text-gray-600">
              <li className="flex justify-between"><span className="font-medium text-gray-700">Stock:</span> <span>{product?.units}</span></li>
              <li className="flex justify-between"><span className="font-medium text-gray-700">Remaining Stock:</span> <span>{product?.units}</span></li>
              <li className="flex justify-between"><span className="font-medium text-gray-700">Threshold Value:</span> <span>{product?.threshold_value}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

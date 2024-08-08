// src/pages/Inventory/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios.jsx";
import moment from "moment";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `/storedata/get-store-product-by-id/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          }
        );
        setProduct(data?.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    })();
  }, [productId, UserToken]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white h-[550px] w-full p-4 rounded-lg">
      <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between ">
        <p className="font-semibold text-xl">{product.product_name}</p>
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

      <div>
        <p>Overview</p>
      </div>

      </div>
      
      <div className="w-full border-2 border-gray-100 mt-2">
      </div>
      
      {/* details section */}
      <div className="flex flex-row justify-between p-4">
      {/* left */}
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-lg text-[#48505E]">Primary Details</h1>
          <ul className=" leading-5 space-y-4 text-[#858D9D]">
            <li className="flex flex-row "><div className="w-36">Product Name :</div> <div className="text-[#5D6679]">{product.product_name}</div></li>
            <li className="flex flex-row "><div className="w-36">Product ID : </div><div className="text-[#5D6679]">{product._id}</div></li>
            <li className="flex flex-row "><div className="w-36">Product category: </div><div className="text-[#5D6679]">{product.product_name}</div></li>
            <li className="flex flex-row"><div className="w-36">Expiry Date : </div><div className="text-[#5D6679]">{product.nearest_expiry_date}</div></li>
            <li className="flex flex-row "><div className="w-36">Threshold Value : </div><div className="text-[#5D6679]">{product.threshold_value}</div></li>
            <li className="flex flex-row "><div className="w-36">MRP : </div><div className="text-[#5D6679]">{product.product_mrp}</div></li>
            <li className="flex flex-row "><div className="w-36">Buying Price : </div><div className="text-[#5D6679]">{product.product_buying_price}</div></li>
            <li className="flex flex-row "><div className="w-36">Selling Price : </div><div className="text-[#5D6679]">{product.product_mrp}</div></li>

          </ul>
        </div>
        {/* right */}
        <div className="pr-10">
          <div><img src={product.product_image_url} className="w-32 h-32 border-dashed border-2 border-[#9D9D9D] object-contain" /></div>
          <div className="mt-8">
          <ul className=" leading-5 space-y-3 text-[#858D9D]">
            <li className="flex flex-row "><div className="w-36">Stock:</div> <div className="text-[#5D6679]">{product.units}</div></li>
            <li className="flex flex-row"><div className="w-36">Remaining Stock : </div><div className="text-[#5D6679]">{product.units}</div></li>
            <li className="flex flex-row"><div className="w-36">Threshold Value : </div><div className="text-[#5D6679]">{product.threshold_value}</div></li>
          </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

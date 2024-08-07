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
    <div className="bg-white p-4 rounded-lg">
      <h1 className="text-xl font-medium">{product.product_name}</h1>
      <p>Price: {product.product_mrp}</p>
      <p>Quantity: {product.product_quantity}</p>
      <p>Units: {product.units}</p>
      <p>Threshold: {product.threshold_value}</p>
      <p>Expiry Date: {moment(product.nearest_expiry_date).format("DD/MM/YYYY")}</p>
      <p>
        Availability:{" "}
        {product.units > product.threshold_value ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  );
};

export default ProductDetails;

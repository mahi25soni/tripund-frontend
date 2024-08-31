import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderBill = ({ order }) => {
  const [store, setStore] = useState(null);

  const calculateOrderValue = (product_mrp, quantity) => {
    return product_mrp * quantity;
  };

  const fetchStoreDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/store/storeDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStore(response.data.store[0]);
    } catch (error) {
      console.error("Error fetching store details:", error);
    }
  };

  useEffect(() => {
    fetchStoreDetails();
  }, []);

  useEffect(() => {
    console.log(store);
  }, [store]);


  if (!store) {
    return <div>Loading...</div>;
  }


  return (
    <div
      id="pdf-content"
      style={{
        padding: "10px",
        color: "#333",
        maxWidth: "700px",
        margin: "auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor:'white'
        // boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)"
      }}
    >
      {/* Header Section */}
      <div style={{ borderBottom: "2px solid #333", paddingBottom: "10px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {/* <img src={store.logo} alt="Store Logo" style={{ height: "50px" }} /> */}
          <div style={{ textAlign: "center" }}>
            <h2 className="text-xl font-semibold" style={{ margin: 0 }}>{store.storeName}</h2>
            <p style={{ margin: 0 }}>{store.businessType}</p>
            <p style={{ margin: 0 }}>{store.storeCategory}</p>
            <p style={{ margin: 0 }}>{store.location}</p>
          </div>
        </div>
      </div>

      {/* Order Information Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Order Information</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p><strong>Customer:</strong> {order.userId?.name}</p>
            <p><strong>Email:</strong> {order.userId?.email}</p>
            <p><strong>Phone:</strong> {order.userId?.phone}</p>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div>
        <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Products</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Product</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Quantity</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Price (Rs)</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>Total (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {order.products?.map((product, index) => (
              <tr key={index}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {product.productId?.product_name}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                  {product.quantity}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                  Rs {product.productId?.product_mrp.toFixed(2)}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "8px", textAlign: "right" }}>
                  Rs {calculateOrderValue(product.productId?.product_mrp, product.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount Section */}
      <div style={{ textAlign: "right", marginTop: "20px", paddingTop: "10px", borderTop: "2px solid #333" }}>
        <h3>Total Amount: Rs {order.totalAmount.toFixed(2)}</h3>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#888" }}>
        <p>Thank you for your order!</p>
        <p>If you have any questions, please contact us at {store.email}</p>
      </div>
    </div>
  );
};

export default OrderBill;

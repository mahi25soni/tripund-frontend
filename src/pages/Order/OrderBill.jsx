import React, { useState, useEffect } from "react";
import axios from "../../../axios";

const OrderBill = ({ order }) => {
  const [store, setStore] = useState(null);

  const calculateOrderValue = (product_mrp, quantity) => {
    return product_mrp * quantity;
  };

  const fetchStoreDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/store/storeDetails", {
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
        padding: "5px",
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
      <div style={{ borderBottom: "1px solid black", paddingBottom: "10px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {/* <img src={store.logo} alt="Store Logo" style={{ height: "50px" }} /> */}
          <div style={{ textAlign: "center" }}>
            <h2 className="text-lg font-semibold" style={{ margin: 0 }}>{store.storeName}</h2>
            <p style={{ margin: 0, fontSize:12 }}>{store?.gstNumber}</p>
            <p style={{ margin: 0, fontSize:12 }}>{store?.businessType}</p>
            <p style={{ margin: 0, fontSize:12  }}>{store?.address}</p>

          </div>
        </div>
      </div>

      <div style={{ marginBottom: "20px", fontSize:12}}>
        {/* <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>Order Information</h3> */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <p>Order ID: {order?.orderId}</p>
            <p>Order Date: {new Date(order?.createdAt).toLocaleDateString("en-GB")}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p>{order?.userId?.name}</p>
            <p>{order?.userId?.phone}</p>
          </div>
        </div>
      </div>

      {/* Products Table Section */}
      <div className="text-xs">
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>Product</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>Qty</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>MRP</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>Discount</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>Total</th>
              <th style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>GST </th>

            </tr>
          </thead>
          <tbody>
            {order?.products?.map((product, index) => (
              <tr key={index}>
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px" }}>
                  {product?.productId?.product_name}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                  {product.quantity}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                  ₹{product?.productId?.product_mrp.toFixed(2) || 'N/A'}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                  ₹{product?.discountAmount.toFixed(2) || 'N/A'}
                </td>
        
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left" }}>
                  ₹{product?.totalPrice.toFixed(2)}
                </td>
                <td style={{ borderBottom: "1px solid #ddd", padding: "4px", textAlign: "left"  }}>
                  ₹{product?.gstAmount.toFixed(2)}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount Section */}
      <div style={{ textAlign: "right", marginTop: "20px", paddingTop: "10px", borderTop: "1px solid #333" , fontSize:12}}>
        <h3>Line Total: ₹{order.totalBill.toFixed(2)}</h3>
      </div>
      <div style={{ textAlign: "right", marginTop: "1px", paddingTop: "4px",  fontSize:12 }}>
        <h3>Discount: ₹{order?.totalDiscount?.toFixed(2)}</h3>
      </div>
      <div style={{ textAlign: "right", marginTop: "1px", paddingTop: "4px",  fontSize:12 }}>
        <h3>GST: ₹{order.totalGst.toFixed(2)}</h3>
      </div>
      <div style={{ textAlign: "right", marginTop: "20px", paddingTop: "10px", borderTop: "1px solid #333"}}>
        <h3 className="text-14px font-bold">Grand Total: ₹{order.finalBillToPay.toFixed(2)}</h3>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: "10px", marginBottom:'10px', textAlign: "center", fontSize: "12px", color: "#888" }}>
        <p>Thank you for your order!</p>
        <p>If you have any questions, please contact us at {store.phoneNumber}</p>
      </div>
    </div>
  );
};

export default OrderBill;

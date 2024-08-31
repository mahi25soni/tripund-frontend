import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import OrderBill from "./OrderBill";
import { GoDownload } from "react-icons/go";

const OrderDetails = ({ order, onClose }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!order) return null; // Render nothing if no order data is provided

  const calculateOrderValue = (product_mrp, quantity) => {
    return product_mrp * quantity;
  };

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/store/storeDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStore(response.data); // Assuming the store data is in the first element of the array
      } catch (error) {
        console.error("Error fetching store details:", error);
        // Consider showing an error message to the user here
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, []);

  const downloadPDF = async () => {
    const input = document.getElementById("pdf-content");

    // Use a higher scale for better quality
    const canvas = await html2canvas(input, { scale: 3, useCORS: true });

    // Convert canvas to image data
    const imgData = canvas.toDataURL("image/png");

    // Initialize jsPDF with the right dimensions for A4
    const pdf = new jsPDF({
      orientation: "portrait", // or "landscape"
      unit: "mm",
      format: [210, 297], // A4 size
    });

    // Adjust the position and size of the image in the PDF
    const imgWidth = 210; // Full width of A4
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // If the content exceeds one page, add new pages
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("order-details.pdf");
  };

  return (
    <div>
    <div className="flex w-full">
    <div className="w-3/5">
      <div className="flex justify-evenly bg-gray-100 p-4 mb-2 rounded-lg items-center h-32">
        <div>
          <p className="text-md">Order ID</p>
          <p className="font-medium">{order._id}</p>
        </div>

        <div>
          <p className="text-md">Ordered By</p>
          <p className="font-bold">{order.userId?.name}</p>
        </div>

        <div>
          <p className="text-md">Products</p>
          <p className="font-bold">{order.products.length}</p>
        </div>

        <div>
          <p className="text-md">Amount</p>
          <p className="font-bold">Rs {order.totalAmount}</p>
        </div>

        <div>
          <p className="text-md">Ordered At</p>
          <p className="font-bold">
            {new Date(order.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>

        <div>
          <p className="text-md">Status</p>
          <p className="font-bold">{order.status}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="text-xl font-medium">Products</div>

        <div className="my-4 flex flex-col gap-2">
          {order.products?.map((product, index) => (
            <div key={index} className="grid grid-cols-3 h-20 text-center">
              <div className="flex items-center gap-4">
                <img
                  src={product.productId?.product_image_url}
                  alt={product.productId?.product_name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "4px",
                  }}
                />

                <div>
                  <p className="font-semibold">{product.productId?.product_name}</p>
                  <p className="text-md font-normal">
                    <span className="text-sm font-normal">
                      Rs {product?.productId?.product_mrp} <span>{' | '}</span> {product?.productId?.product_quantity}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end items-center text-md font-medium gap-1">
                <p>Order value</p>
                <p className="h-[22px] w-[50px] bg-green-200 text-green-500 rounded-md">
                  Rs {calculateOrderValue(product.productId.product_mrp, product.quantity)}
                </p>
              </div>
              <div className="flex justify-end items-center text-md font-medium gap-1">
                <p>Quantity</p>
                <p className="h-[22px] w-[22px] bg-green-200 text-green-500 rounded-full">
                  {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      
      <div className="w-2/5 bg-gray-200 h-screen px-8">
      <div
        onClick={downloadPDF}
        className="mt-4 px-4 py-2 w-fit flex text-black  rounded-lg whitespace-nowrap cursor-pointer"
      >
        <GoDownload size={20}/> Download Bill
      </div>
      {loading ? (
        <p>Loading Bill...</p>
      ) : (
        store && <OrderBill order={order} store={store} />
      )}
      </div>
      <button
        onClick={onClose}
        className="absolute bottom-4 left-16 h-fit mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Close
      </button>
    </div>
    
    </div>
  );
};

export default OrderDetails;

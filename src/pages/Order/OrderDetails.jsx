import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "../../../axios";
import OrderBill from "./OrderBill";
import { GoDownload } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ClipLoader } from "react-spinners"; 

const OrderDetails = ({ order, onClose }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!order) return null;

  const calculateOrderValue = (product_mrp, quantity) => {
    return product_mrp * quantity;
  };

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/store/storeDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStore(response.data);
      } catch (error) {
        console.error("Error fetching store details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, []);

  const downloadPDF = async () => {
    const input = document.getElementById("pdf-content");

    const canvas = await html2canvas(input, { scale: 3, useCORS: true });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297],
    });

    const imgWidth = 210;
    const pageHeight = 300;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`order-${order?.orderId}.pdf`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="fixed top-4 right-8 flex gap-2 z-50">
        <button
          onClick={downloadPDF}
          className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-black rounded-full shadow-lg border border-gray-200 hover:border-blue-300 hover:text-blue-500 transition-all hover:shadow-md"
        >
          <GoDownload size={20} className="mr-2" /> Download Bill
        </button>
        <button
          onClick={onClose}
          className="flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-black rounded-full shadow-lg border border-gray-200 hover:border-blue-300 hover:text-blue-500 transition-all hover:shadow-md"
        >
          <IoCloseCircleOutline size={20} className="mr-2" /> Close
        </button>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="w-full lg:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-gray-100">
            <div>
              <p className="text-sm sm:text-md text-gray-600">Order ID</p>
              <p className="font-medium text-md sm:text-lg">{order?.orderId}</p>
            </div>
            <div>
              <p className="text-sm sm:text-md text-gray-600">Ordered By</p>
              <p className="font-medium text-md sm:text-lg">{order?.userId?.name}</p>
            </div>
            <div>
              <p className="text-sm sm:text-md text-gray-600">Products</p>
              <p className="font-medium text-md sm:text-lg">{order?.products?.length}</p>
            </div>
            <div>
              <p className="text-sm sm:text-md text-gray-600">Amount</p>
              <p className="font-medium text-md sm:text-lg">
                Rs {order?.finalBillToPay.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-md text-gray-600">Ordered On</p>
              <p className="font-medium text-md sm:text-lg">
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg mt-4 shadow-sm border border-gray-100">
            <div className="text-lg sm:text-xl font-medium mb-4">Products</div>
            <div className="my-4 flex flex-col gap-2">
              {order.products?.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 border border-gray-100 rounded-md hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <img
                      src={product?.productId?.product_img[0]}
                      alt={'img'}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm sm:text-md">
                        {product?.productId?.product_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Rs {product?.productId?.product_mrp} | {product?.productId?.product_quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end sm:justify-center">
                    <p className="text-sm sm:text-md">Order value</p>
                    <p className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-md text-sm sm:text-md">
                      Rs {product?.totalPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-end sm:justify-center">
                    <p className="text-sm sm:text-md">Quantity</p>
                    <p className="ml-2 px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm sm:text-md">
                      {product?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/5 bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-md mt-4 lg:mt-0 shadow-sm border border-gray-100">
          <div className="my-4 sm:my-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <ClipLoader color="#3B82F6" size={50} /> 
              </div>
            ) : (
              store && (
                <div id="pdf-content" className="w-full h-[80vh] overflow-y-auto">
                  <OrderBill order={order} store={store} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
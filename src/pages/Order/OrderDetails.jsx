import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "../../../axios";
import OrderBill from "./OrderBill";
import { GoDownload, GoIssueClosed } from "react-icons/go";
import { BiCloset, BiCollapse, BiCross, BiWindowClose } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";

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
        setStore(response.data); // Assuming the store data is in the first element of the array
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

    pdf.save("order-details.pdf");
  };

  return (
    <div>
      <div className="flex w-full">
        <div className="w-3/5 mx-6">
          <div className="flex justify-between bg-gray-100 p-4 rounded-lg items-center h-32">
            <div>
              <p className="text-md">Order ID</p>
              <p className="font-medium text-lg">{order?.orderId}</p>
            </div>

            <div>
              <p className="text-md">Ordered By</p>
              <p className="font-medium text-lg">{order?.userId?.name}</p>
            </div>

            <div>
              <p className="text-md">Products</p>
              <p className="font-medium text-lg">{order?.products?.length}</p>
            </div>

            <div>
              <p className="text-md">Amount</p>
              <p className="font-medium text-lg">
                Rs {order?.finalBillToPay.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-md">Ordered On</p>
              <p className="font-medium text-lg">
                {new Date(order.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="text-xl font-medium">Products</div>

            <div className="my-4 flex flex-col gap-2">
              {order.products?.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 h-20 text-center border rounded-md px-2 hover:shadow hover:border-blue-300"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product?.productId?.product_img[0]}
                      alt={'img'}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "4px",
                      }}
                    />

                    <div className="text-left">
                      <p className="font-semibold">
                        {product?.productId?.product_name}
                      </p>
                      <p className="text-md font-normal">
                        <span className="text-sm font-normal">
                          Rs {product?.productId?.product_mrp}{" "}
                          <span>{" | "}</span>{" "}
                          {product?.productId?.product_quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center text-md font-medium gap-1">
                    <p>Order value</p>
                    <p className="h-[22px] w-fit px-2  bg-green-200 text-green-500 rounded-md">
                      Rs {product?.totalPrice}
                    </p>
                  </div>
                  <div className="flex justify-end items-center text-md font-medium gap-1">
                    <p>Quantity</p>
                    <p className="h-[22px] w-[22px] bg-green-200 text-green-500 rounded-full">
                      {product?.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 bg-gray-100 min-h-screen px-8 rounded-md">
          <div className="my-12">
            {loading ? (
              <p>Loading Bill...</p>
            ) : (
              store && <OrderBill order={order} store={store} />
            )}
          </div>
        </div>

        <div className="absolute top-0 right-16 bg flex gap-x-2  rounded-full ">
          <div
            onClick={downloadPDF}
            className="mt-4 px-4 py-2 w-fit flex text-black bg-white rounded-full whitespace-nowrap cursor-pointer border shadow-lg hover:border-blue-300 hover:text-blue-500"
          >
            <GoDownload size={20} /> Download Bill
          </div>
          <div
            onClick={onClose}
            className=" h-fit flex mt-4 p-2 bg-white text-black rounded-full shadow-lg border hover:border-blue-300 hover:text-blue-500 hover:cursor-pointer"
          >
            <div className="pt-0.5">
              <IoCloseCircleOutline size={20} />
            </div>
            <p>Close</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

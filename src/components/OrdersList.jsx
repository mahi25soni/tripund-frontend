import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Dialog } from "@headlessui/react";
import moment from "moment";
import Spinner from "../components/Spinner"; // Import the Spinner
import OrderDetails from "../pages/Order/OrderDetails";

export const OrdersList = ({ setOpenOrderDetails }) => {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); // Set loading to true when starting to fetch
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/orders/getOrders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { orders: fetchedOrders } = response.data;

        // Sort orders by timestamp (latest first)
        const sortedOrders = fetchedOrders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
        setOrderStatuses(
          sortedOrders.reduce((acc, order) => {
            acc[order._id] = order.status;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchOrders();

    // Polling to refresh data periodically
    const intervalId = setInterval(fetchOrders, 60000); // Fetch every 60 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount

  }, []); // Empty dependency array means this effect runs once on mount

  const handleOpenOrderDetails = (orderId) => {
    const order = orders.find((element) => element._id === orderId);
    if (order) {
      console.log("Selected Order Data:", order);
      setSelectedOrder(order);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    // Optimistic UI Update
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));

    const token = localStorage.getItem("token");

    axios
      .post(
        `/orders/updateOrder/${orderId}`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      )
      .then((response) => {
        console.log("Order status updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error.message);
        // Revert optimistic UI update on error
        setOrderStatuses((prevStatuses) => ({
          ...prevStatuses,
          [orderId]: prevStatuses[orderId],
        }));
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-orange-200 text-orange-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Out for Delivery":
        return "bg-purple-200 text-purple-800";
      case "Returned":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Calculate pending orders count
  const pendingOrdersCount = orders.filter((order) => order.status === "Pending").length;

  return (
    <div className="bg-white p-4 rounded-lg flex-grow">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-medium">Orders</div>
          {pendingOrdersCount > 0 && (
            <span className="ml-2 px-2 py-1 text-white bg-red-600 rounded-full text-xs font-bold">
              {pendingOrdersCount}
            </span>
          )}
        </div>
        <button className="px-4 py-2.5 border-2 rounded hover:bg-blue-700 hover:text-white hover:border-blue-700">
          Filters
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available</p>
      ) : (
        <div className="my-4">
          <div className="flex items-center justify-between border-b-2 text-left font-medium text-sm text-gray-400 p-1">
            <h6 className="w-1/2 py-1">Customer</h6>
            <h6 className="w-1/2 py-1">Order Value</h6>
            <h6 className="w-1/2 py-1">Order ID</h6>
            <h6 className="w-1/2 py-1">Receiving Date</h6>
            <h6 className="w-1/2 py-1">Status</h6>
            <h6 className="w-1/2 py-1"></h6>
          </div>

          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b-2 text-left font-medium p-1"
            >
              <p className="w-1/2 py-1">{order.userId?.name}</p>
              <p className="w-1/2 py-1">Rs {order.totalAmount}</p>
              <p className="w-1/2 py-1">{order._id}</p>
              <p className="w-1/2 py-1">
                {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
              </p>
              <div className="w-1/2 py-1 relative mr-2">
                <div
                  className={`cursor-pointer p-2 rounded ${getStatusColor(
                    orderStatuses[order._id]
                  )}`}
                >
                  <span>{orderStatuses[order._id]}</span>
                </div>
                <select
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  value={orderStatuses[order._id]}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Returned">Returned</option>
                </select>
              </div>
              <div className="w-1/2 h-full flex gap-2">
                <button
                  className="rounded-md py-2 bg-blue-200 text-blue-600 border-none w-[130px] h-full"
                  onClick={() => handleOpenOrderDetails(order._id)}
                >
                  View Order List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-full m-12 h-screen overflow-y-auto">
            <OrderDetails order={selectedOrder} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

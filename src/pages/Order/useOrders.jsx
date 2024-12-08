import { useState, useEffect } from "react";
import axios from "../../../axios";

export const useOrders = (itemsPerPage) => {
  const [orders, setOrders] = useState([]);
  const [orderCounts, setOrderCounts] = useState({
    totalOrders: 0,
    pending: 0,
    packing: 0,
    outForDelivery: 0,
    cancelled: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrderCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/orders/status-counts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) setOrderCounts(response.data.data);
    } catch (error) {
      console.error("Error fetching order counts:", error);
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/orders/getOrders", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage, limit: itemsPerPage },
      });
      const { orders: fetchedOrders, total_pages } = response.data.data;
      setOrders(fetchedOrders);
      setTotalPages(total_pages);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `/orders/updateOrder/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchOrderCounts();
    fetchOrders();
  }, [currentPage]);

  return {
    orders,
    orderCounts,
    currentPage,
    totalPages,
    loading,
    setCurrentPage,
    updateOrderStatus,
    fetchOrderCounts,
  };
};

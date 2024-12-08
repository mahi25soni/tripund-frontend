import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { useSocket } from "../components/Context/SocketContext"; 
import "tailwindcss/tailwind.css";
import { MdCheckCircle } from "react-icons/md";


const Notification = () => {
  const { notifications, setNotifications } = useSocket();
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/notification/all-notifications');
        console.log("Fetched notifications:", response.data);
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [setNotifications]);

  const handleMarkAsRead = async (id) => {
    if (!id) {
      console.error("Notification ID is undefined");
      return;
    }
    try {
      await axios.put(`/notification/all-notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`/notification/all-notifications/mark-all-read`);
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "read") return notification.read;
    if (activeTab === "unread") return !notification.read;
  });



  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">

      <h3 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h3>
      <div className="flex justify-between items-center mb-4">
        <ul className="flex space-x-6">
          <li
            className={`cursor-pointer ${
              activeTab === "all" ? "font-bold text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </li>
          <li
            className={`relative cursor-pointer ${
              activeTab === "read" ? "font-bold text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("read")}
          >
            Read
          </li>
          <li
            className={`relative cursor-pointer ${
              activeTab === "unread"
                ? "font-bold text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("unread")}
          >
            Unread
            {unreadCount > 0 && activeTab !== "unread" && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </li>
        </ul>
        <button
          onClick={handleMarkAllAsRead}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Mark All as Read
        </button>
      </div>
      <ul className="space-y-6">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => (
            <li
              key={notification.id || `${index}-${notification.message}`} // Fallback key if id is not present or not unique
              className={`p-4 border rounded-lg shadow-md ${
                notification.read ? "bg-green-50" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    {notification.userId?.user_name ||
                      notification.userId?.phone}
                  </p>
                  {notification.userId?.email && (
                    <p className="text-sm text-gray-500">
                      {notification.userId.email}
                    </p>
                  )}
                </div>
              </div>

              <p className="text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))
        ) : (
          <li className="p-4 border rounded-lg shadow-sm bg-gray-50 text-gray-700">
            No notifications yet.
          </li>
        )}
      </ul>
      
    </div>
  );
};

export default Notification;

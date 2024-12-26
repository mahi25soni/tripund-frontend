import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import { Dialog } from "@headlessui/react";
import moment from "moment";
import Spinner from "../Spinner"; // Import the Spinner
import OrderDetails from "../../pages/Order/OrderDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SearchFilter } from "./OrderFilter";
import { BsEye } from "react-icons/bs";

export const OrdersList = ({ setOpenOrderDetails, updateOrderCounts }) => {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [itemsPerPage] = useState(10); 
  const [searchParams, setSearchParams] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true); 
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
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        setOrders(response?.data?.data?.orders);
        setTotalPages(response?.data?.data?.total_pages);
        setPendingOrdersCount(response?.data?.data?.total_pending_orders);
        setOrderStatuses(
          response.data.data.orders.reduce((acc, order) => {
            acc[order._id] = order.status;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, [currentPage, itemsPerPage]); 


  useEffect(() => {
    const fetchFilteredOrders = async () => {
      if (!searchParams || Object.keys(searchParams).length === 0) {
        console.log("No search parameters, skipping API call.");
        return;
      }
  
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authorization token is missing.");
          return;
        }
        const response = await axios.get("/orders/filterOrders", {
          headers: { Authorization: `Bearer ${token}` },
          params: searchParams,
        });
        
          setFilteredOrders(response?.data?.orders);
          setTotalPages(response?.data?.pagination?.totalPages);

          if(response.data.orders.length === 0){
            showToast("No Product for this filter",'warning')
          }
  
       
      } catch (error) {
        console.error('Error fetching filtered orders:', error);
      }
    };
  
    fetchFilteredOrders();
  }, [searchParams]);
  

  const handleSearchChange = (updatedParams) => {
    setSearchParams((prev) => ({ ...prev, ...updatedParams, page: 1 }));
  };

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

  const statusTransitions = {
    Pending: ["Processing", "Cancelled"],
    Processing: ["Out for Delivery"],
    "Out for Delivery": ["Delivered",],
    Delivered: [],
    Cancelled: [],
  };
  
  const handleStatusChange = (orderId, newStatus) => {
    const currentStatus = orderStatuses[orderId];
    
    // Validate the transition
    if (!statusTransitions[currentStatus].includes(newStatus)) {
      toast.warning(`Invalid transition from "${currentStatus}" to "${newStatus}"`);
      return;
    }
  
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
          },
        }
      )
      .then((response) => {
        toast.success("Status updated successfully!");
        setOrderStatuses((prevStatuses) => ({
          ...prevStatuses,
          [orderId]: newStatus,
        }));
  
        if (updateOrderCounts) updateOrderCounts();
      })
      .catch((error) => {
        console.error("Error updating status:", error.message);
        toast.error("Error while updating status. Try again.");
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


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedOrders = filteredOrders.length > 0 ? filteredOrders : orders;

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
        <SearchFilter onSearchChange={handleSearchChange} />
       
      </div>

      {loading ? (
        <Spinner />
      ) : displayedOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders available</p>
      ) : (
        <div className="my-4">
          <div className="flex items-center justify-between border-b-2 text-left font-medium text-sm text-gray-400 p-1">
            <h6 className="w-1/2 py-1">Order ID</h6>
            <h6 className="w-1/2 py-1">Customer</h6>
            <h6 className="w-1/2 py-1">Order Value</h6>
            <h6 className="w-1/2 py-1">Ordering Date</h6>
            <h6 className="w-1/2 py-1">Status</h6>
            <h6 className="w-1/2 py-1">Actions</h6>
          </div>

          {displayedOrders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b-2 text-left font-medium p-1"
            >
              <p className="w-1/2 py-1">{order.orderId}</p>
              <p className="w-1/2 py-1">{order.userId?.name}</p>
              <p className="w-1/2 py-1">Rs {order.finalBillToPay.toFixed(2)}</p>
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
    <option disabled value={orderStatuses[order._id]}>
      {orderStatuses[order._id]}
    </option>
    {statusTransitions[orderStatuses[order._id]]?.map((status) => (
      <option className=" my-2 py-2" key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>

              <div className="w-1/2 h-full flex gap-2  border text-blue-600 p-2 rounded-md">
              <div>
                    <BsEye size={20}/>
              </div>
                <button
                  className="rounded-md py-2border-none w-[130px] h-full"
                  onClick={() => handleOpenOrderDetails(order._id)}
                >
                  View Order List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-full m-12 h-screen overflow-y-auto">
            <OrderDetails order={selectedOrder} onClose={handleCloseModal} />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};


// import React, { useState, useEffect } from "react";
// import Select from "react-select"; // Import react-select
// import axios from "../../../axios";
// import { Dialog } from "@headlessui/react";
// import moment from "moment";
// import Spinner from "../Spinner"; // Import the Spinner
// import OrderDetails from "../../pages/Order/OrderDetails";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { SearchFilter } from "./OrderFilter";
// import { BsEye } from "react-icons/bs";

// export const OrdersList = ({ setOpenOrderDetails, updateOrderCounts }) => {
//   const [orders, setOrders] = useState([]);
//   const [orderStatuses, setOrderStatuses] = useState({});
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchParams, setSearchParams] = useState({});
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [pendingOrdersCount, setPendingOrdersCount] = useState(0);


//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           console.error("Authorization token is missing.");
//           return;
//         }
//         const response = await axios.get("/orders/getOrders", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             page: currentPage,
//             limit: itemsPerPage,
//           },
//         });

//         setOrders(response?.data?.data?.orders);
//         setTotalPages(response?.data?.data?.total_pages);
//         setPendingOrdersCount(response?.data?.data?.total_pending_orders);
//         setOrderStatuses(
//           response.data.data.orders.reduce((acc, order) => {
//             acc[order._id] = order.status;
//             return acc;
//           }, {})
//         );
//       } catch (error) {
//         console.error("Error fetching orders:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [currentPage, itemsPerPage]);

//   const statusTransitions = {
//     Pending: ["Processing", "Cancelled"],
//     Processing: ["Out for Delivery"],
//     "Out for Delivery": ["Delivered",],
//     Delivered: [],
//     Cancelled: [],
//   };
  
//   const handleStatusChange = (orderId, newStatus) => {
//     const currentStatus = orderStatuses[orderId];
    
//     // Validate the transition
//     if (!statusTransitions[currentStatus].includes(newStatus)) {
//       toast.warning(`Invalid transition from "${currentStatus}" to "${newStatus}"`);
//       return;
//     }
  
//     setOrderStatuses((prevStatuses) => ({
//       ...prevStatuses,
//       [orderId]: newStatus,
//     }));
  
//     const token = localStorage.getItem("token");
  
//     axios
//       .post(
//         `/orders/updateOrder/${orderId}`,
//         { status: newStatus },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         toast.success("Status updated successfully!");
//         setOrderStatuses((prevStatuses) => ({
//           ...prevStatuses,
//           [orderId]: newStatus,
//         }));
  
//         if (updateOrderCounts) updateOrderCounts();
//       })
//       .catch((error) => {
//         console.error("Error updating status:", error.message);
//         toast.error("Error while updating status. Try again.");
//         setOrderStatuses((prevStatuses) => ({
//           ...prevStatuses,
//           [orderId]: prevStatuses[orderId],
//         }));
//       });
//   };
  

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Pending":
//         return "bg-orange-200 text-orange-800";
//       case "Processing":
//         return "bg-yellow-200 text-yellow-800";
//         case "Out for Delivery":
//           return "bg-purple-200 text-purple-800";

//       case "Delivered":
//         return "bg-green-200 text-green-800";
      
//       case "Cancelled":
//         return "bg-red-200 text-red-800";
     
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const displayedOrders = filteredOrders.length > 0 ? filteredOrders : orders;

//   return (
//     <div className="bg-white p-4 rounded-lg flex-grow">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           <div className="text-xl font-medium">Orders</div>
//           {pendingOrdersCount > 0 && (
//             <span className="ml-2 px-2 py-1 text-white bg-red-600 rounded-full text-xs font-bold">
//               {pendingOrdersCount}
//             </span>
//           )}
//         </div>
//         <SearchFilter onSearchChange={setSearchParams} />
//       </div>

//       {loading ? (
//         <Spinner />
//       ) : displayedOrders.length === 0 ? (
//         <p className="text-center text-gray-500">No orders available</p>
//       ) : (
//         <div className="my-4">
//           <div className="flex items-center justify-between border-b-2 text-left font-medium text-sm text-gray-400 p-1">
//             <h6 className="w-1/2 py-1">Order ID</h6>
//             <h6 className="w-1/2 py-1">Customer</h6>
//             <h6 className="w-1/2 py-1">Order Value</h6>
//             <h6 className="w-1/2 py-1">Ordering Date</h6>
//             <h6 className="w-1/2 py-1">Status</h6>
//             <h6 className="w-1/2 py-1">Actions</h6>
//           </div>

//           {displayedOrders.map((order) => (
//             <div
//               key={order._id}
//               className="flex items-center justify-between border-b-2 text-left font-medium p-1"
//             >
//               <p className="w-1/2 py-1">{order.orderId}</p>
//               <p className="w-1/2 py-1">{order.userId?.name}</p>
//               <p className="w-1/2 py-1">Rs {order.finalBillToPay.toFixed(2)}</p>
//               <p className="w-1/2 py-1">
//                 {moment(order.createdAt).format("DD MMM YYYY, h:mm A")}
//               </p>
//               <div className="w-1/2 py-1 relative mr-2">
//   <div
//     className={`cursor-pointer p-2 rounded ${getStatusColor(
//       orderStatuses[order._id]
//     )}`}
//   >
//     <span>{orderStatuses[order._id]}</span>
//   </div>
//   <select
//     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//     onChange={(e) => handleStatusChange(order._id, e.target.value)}
//     value={orderStatuses[order._id]}
//   >
//     <option disabled value={orderStatuses[order._id]}>
//       {orderStatuses[order._id]}
//     </option>
//     {statusTransitions[orderStatuses[order._id]]?.map((status) => (
//       <option className=" my-2 py-2" key={status} value={status}>
//         {status}
//       </option>
//     ))}
//   </select>
// </div>

//               <div className="w-1/2 flex items-center gap-2 border border-blue-500 text-blue-800 px-2 rounded-md">
//                 <BsEye size={20} />
//                 <button
//                   className="rounded-md py-2 w-[130px]"
//                   onClick={() => (order)}
//                 >
//                   View Order List
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };





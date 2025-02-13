import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const DeliveryTimePopup = ({ isOpen, onClose, onSave }) => {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("minutes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const convertToMinutes = async () => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue <= 0) {
      alert("Please enter a valid number.");
      return;
    }

    let minutes = 0;
    if (unit === "minutes") {
      minutes = numValue;
    } else if (unit === "hours") {
      minutes = numValue * 60;
    } else if (unit === "days") {
      minutes = numValue * 24 * 60;
    }

    setLoading(true);
    setError("");

    try {
      // Call the API to save delivery time
      const response = await axios.put("/store/editStore",         
        { deliveryDuration: minutes },
        {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      });
      console.log("API Response:", response.data);

      onSave(minutes);
      toast.success('Duration Set sucessfully!')
      onClose();
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to save delivery duration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <ToastContainer/>
      <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Set Delivery Duration
          </Dialog.Title>
          <div className="flex items-center gap-4 mb-4">
            <input
              type="number"
              min="1"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-2/3 p-2 border border-gray-300 rounded"
              placeholder="Enter value"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-1/3 p-2 border border-gray-300 rounded"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
            </select>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={convertToMinutes}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeliveryTimePopup;

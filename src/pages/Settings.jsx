import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mapIcon from '../assets/mapIcon.png';
import deliveryTime from '../assets/deliverytime.png';
import { Dialog } from "@headlessui/react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { RiArrowRightWideFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DeliveryTimePopup from "../components/TimeSetPopup";

const Settings = () => {
  const [storeData, setStoreData] = useState({
    logo: "",
    storeName: "",
    location: "",
    email: "",
    phoneNumber: "",
    deliveryTiming: ""
  });
  const [editingField, setEditingField] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [deliveryDuration, setDeliveryDuration] = useState(null);
  const [isDeliveryTimePopupOpen, setIsDeliveryTimePopupOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get("/store/storeId", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched Store Data:", response.data);
        setStoreData(response.data.store);
        setDeliveryDuration(response.data.store.deliveryDuration);
      } catch (error) {
        console.error("Error fetching store data:", error.message);
        console.error("Error Details:", error.response);
      }
    };
    fetchStoreData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", selectedFile);
    formData.append("storeName", storeData.storeName);
    formData.append("email", storeData.email);
    formData.append("phoneNumber", storeData.phoneNumber);
    formData.append("deliveryTime", deliveryTime);

    try {
      const response = await axios.put("/store/editStore", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Updated Store Data Response:", response.data);
      setEditingField(null);
      toast.success("Store information updated successfully!");
    } catch (error) {
      console.error("Error updating store data:", error.message);
      console.error("Error Details:", error.response);
      toast.error("Error updating store information.");
    }
  };

  const handleSave = (duration) => {
    setDeliveryDuration(duration);
    setStoreData((prevData) => ({
      ...prevData,
      deliveryDuration: duration,
    }));
  };

  const renderField = (label, name, value, isEditable) => (
    <div className="flex flex-col lg:flex-row items-start lg:items-center mb-6 gap-4 lg:gap-0">
      <div className="w-full lg:w-1/4 text-gray-700 font-medium lg:font-semibold text-base lg:text-lg">
        {label}
      </div>
      <div className="w-full lg:w-3/4 relative flex items-center">
        {editingField === name ? (
          name === "logo" ? (
            <div className="flex flex-col w-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-base"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-4 w-32 h-32 object-contain rounded-lg"
                />
              )}
            </div>
          ) : (
            <input
              type={name === "email" ? "email" : "text"}
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-base"
            />
          )
        ) : name === "logo" ? (
          <img
            src={logoPreview || value}
            alt="Store Logo"
            className="w-32 h-32 object-contain rounded-lg border"
          />
        ) : (
          <span className="w-full p-3 bg-gray-50 rounded-lg text-base border border-gray-100">
            {value}
          </span>
        )}
        {!editingField && (
          <FaEdit
            className="ml-4 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setEditingField(name)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 w-full">
      <ToastContainer position="top-center" autoClose={3000} />
      <h1 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
        Store Settings
      </h1>
      
      {/* Store Information Section */}
      <div className="bg-white  rounded-xl p-6 lg:p-8 mb-8">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">
          Store Information
        </h2>
        <form onSubmit={handleSubmit}>
          {renderField("Store Logo", "logo", storeData.logo, editingField === "logo")}
          {renderField("Store Name", "storeName", storeData.storeName, editingField === "storeName")}
          {renderField("Email", "email", storeData.email, editingField === "email")}
          {renderField("Phone Number", "phoneNumber", storeData.phoneNumber, editingField === "phoneNumber")}

          {editingField && (
            <div className="flex flex-col lg:flex-row items-center justify-end gap-4 mt-8">
              <button
                type="button"
                className="w-full lg:w-auto px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-base"
                onClick={() => setEditingField(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full lg:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Store Location Section */}
      <Link to='/set-delivery-radius'>
        <div className="bg-white  rounded-xl p-6 mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between hover:border-2 hover:border-blue-400 transition-all cursor-pointer">
          <div className="flex flex-col lg:flex-row gap-6 w-full items-center lg:items-start">
            <img 
              src={mapIcon} 
              className="w-full lg:w-48 h-48 object-contain rounded-lg"
              alt="Map icon"
            />
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-700">Store Location</h2>
              <p className="text-base text-gray-600 mt-2">{storeData.address}</p>
              <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full w-fit mt-4 text-sm lg:text-base">
                Delivery Radius: <strong>{storeData.deliveryRadius/1000}km</strong>
              </p>
            </div>
          </div>
          <div className="self-center">
            <RiArrowRightWideFill size={28} className="text-blue-500"/>
          </div>
        </div>
      </Link>

      {/* Delivery Time Section */}
      <div 
        onClick={() => setIsDeliveryTimePopupOpen(true)} 
        className="bg-white rounded-xl p-6 mb-8 flex flex-col lg:flex-row gap-6 items-center justify-between hover:border-2 hover:border-blue-400 transition-all cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row gap-6 w-full items-center lg:items-start">
          <img 
            src={deliveryTime} 
            className="w-full lg:w-48 h-48 object-contain rounded-lg"
            alt="Delivery time icon"
          />
          <div className="flex-1">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-700">Delivery Time</h2>
            <p className="text-base text-gray-600 mt-2">Estimated time taken for delivery</p>
            <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full w-fit mt-4 text-sm lg:text-base">
              Delivery Duration: <strong>{deliveryDuration} mins</strong>
            </p>
          </div>
        </div>
        <div className="self-center">
          <RiArrowRightWideFill size={28} className="text-blue-500"/>
        </div>
      </div>

      <DeliveryTimePopup 
        isOpen={isDeliveryTimePopupOpen} 
        onClose={() => setIsDeliveryTimePopupOpen(false)} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default Settings;
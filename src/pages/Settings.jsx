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
    phoneNumber:"",
    deliveryTiming: "" 
  });
  const [editingField, setEditingField] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null); // For image preview
  const [selectedFile, setSelectedFile] = useState(null); // For image file
  const [deliveryDuration, setDeliveryDuration] = useState(null);
  const [isDeliveryTimePopupOpen, setIsDeliveryTimePopupOpen] = useState(false); // State to handle popup open/close
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
    <div className="flex items-center mb-4">
      <div className="w-1/3 text-gray-700 font-semibold">{label}</div>
      <div className="w-2/3 relative flex items-center">
        {editingField === name ? (
          name === "logo" ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </>
          ) : (
            <input
              type={name === "email" ? "email" : "text"}
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          )
        ) : name === "logo" ? (
          <img
            src={logoPreview || value}
            alt="Store Logo"
            className="w-24 h-24 object-cover rounded"
          />
        ) : (
          <span className="w-full p-2 bg-gray-100 rounded">{value}</span>
        )}
        {!editingField && (
          <FaEdit
            className="ml-2 text-gray-500 cursor-pointer"
            onClick={() => setEditingField(name)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Store Information</h2>
        <form onSubmit={handleSubmit}>
          {renderField("Store Logo", "logo", storeData.logo, editingField === "logo")}
          {renderField("Store Name", "storeName", storeData.storeName, editingField === "storeName")}
          {renderField("Location", "location", storeData.address, editingField === "address")}
          {renderField("Delivery Radius", "deliveryRadius", storeData.deliveryRadius, editingField === "address")}
          {renderField("Email", "email", storeData.email, editingField === "email")}
          {renderField("Phone Number", "phoneNumber", storeData.phoneNumber, editingField === "phoneNumber")}

          {editingField && (
            <div className="flex items-center justify-end mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setEditingField(null)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      <Link to='/set-delivery-radius'>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex gap-x-4 justify-between hover:border hover:border-blue-400">
          <div className="flex gap-x-4">
            <img src={mapIcon} className="w-28 rounded-md border object-cover"/>
            <div className="mt-2">
              <h2 className="text-xl font-semibold mt-2">Store location</h2>
              <p>{storeData.address}</p>
              <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full w-fit">Delivery Radius: <strong>{storeData.deliveryRadius/1000}km</strong></p>
            </div>
          </div>
          <div className="mt-6">
            <RiArrowRightWideFill size={24} className="text-blue-500"/>
          </div>
        </div>
      </Link>

      <div  onClick={() => setIsDeliveryTimePopupOpen(true)} className="bg-white shadow-md rounded-lg p-6 mb-6 flex gap-x-4 justify-between hover:border hover:border-blue-400">
        <div className="flex gap-x-4">
          <img src={deliveryTime} className="w-28 rounded-md border object-cover"/>
          <div className="mt-2">
            <h2 className="text-xl font-semibold mt-2">Delivery Time</h2>
            <p>Estimated time taken for delivery </p>
            <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full w-fit">Delivery Duration: <strong>{deliveryDuration} mins</strong></p>
          </div>
        </div>
        <div className="mt-6">
          <RiArrowRightWideFill size={24} className="text-blue-500"/>
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
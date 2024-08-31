import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { FaEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const [storeData, setStoreData] = useState({
    logo: "",
    storeName: "",
    location: "",
    email: "",
  });
  const [editingField, setEditingField] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null); // For image preview
  const [selectedFile, setSelectedFile] = useState(null); // For image file
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get("/store/storeDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched Store Data:", response.data.store[0]);
        setStoreData(response.data.store[0]);
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
    setSelectedFile(file); // Set the selected file for upload

    // Generate a preview URL for the image
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
    formData.append("logo", selectedFile); // Append the selected file
    formData.append("storeName", storeData.storeName);
    formData.append("location", storeData.location);
    formData.append("email", storeData.email);

    try {
      const response = await axios.put("/store/editStore", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log("Updated Store Data Response:", response.data);
      setEditingField(null);
      toast.success("Store information updated successfully!"); // Success toast
    } catch (error) {
      console.error("Error updating store data:", error.message);
      console.error("Error Details:", error.response);
      toast.error("Error updating store information."); // Error toast
    }
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
      <ToastContainer /> {/* Toast container for notifications */}
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Store Information</h2>
        <form onSubmit={handleSubmit}>
          {renderField("Store Logo", "logo", storeData.logo, editingField === "logo")}
          {renderField("Store Name", "storeName", storeData.storeName, editingField === "storeName")}
          {renderField("Location", "location", storeData.location, editingField === "location")}
          {renderField("Email", "email", storeData.email, editingField === "email")}

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

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Section 2</h2>
        <p>Content for section 2 goes here.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Section 3</h2>
        <p>Content for section 3 goes here.</p>
      </div>
    </div>
  );
};

export default Settings;
 
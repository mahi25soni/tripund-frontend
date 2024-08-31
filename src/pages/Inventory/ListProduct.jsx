import React, { useState, useEffect } from "react";
import Input from "../../atoms/Input";
import axios from "../../../axios.jsx";
import Spinner from "../../components/Spinner"; // Import the Spinner component
import { toast } from "react-toastify";

export const ListProduct = (props) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for spinner

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/store/getCategories",
          {
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [UserToken]);

  const addProductHandle = async (event) => {
    event.preventDefault();
    setLoading(true); // Start spinner
    const formData = new FormData(event.target);
    formData.append("product_image", image);

    try {
      const { data } = await axios.post(
        "/storedata/add-product-to-store/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        }
      );

      toast.success("Product listed successfully!");

      if (props?.setStoreProductList) {
        const { setStoreProductList, setAddProductPopUp } = props;
        setStoreProductList((prevData) => [...prevData, data?.data]);
        setAddProductPopUp(false);
      }

      // Clear fields
      setImage(null);
      setImagePreview(null);
      event.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to list product.");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div className="bg-white px-4 py-4 m-2 rounded-lg border-3">
      {loading && <Spinner />} {/* Show spinner while loading */}
      <div className="text-xl font-medium mb-2 text-gray-700">Add Product</div>

      <form onSubmit={addProductHandle}>
        <div className="flex flex-row gap-8 w-full justify-between">
          {/* Basic Product Info */}
          <div className="w-full">
            <div className="mb-2 w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_name">
                Product Name
              </label>
              <Input name="product_name" placeholder="Enter product name" />
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_id">
                Product Id
              </label>
              <Input name="product_id" placeholder="Enter product id" />
            </div>
            {/* Category Section */}
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="product_category">
            Category
          </label>
          <select
            id="product_category"
            name="product_category"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <div className="border-2 border-dashed rounded-lg h-64 w-64 border-gray-500 flex justify-center items-center overflow-hidden ml-4">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="font-normal text-gray-500 text-center">
                  <p>Drag image here</p>
                  <p>Or</p>
                  <label className="cursor-pointer text-blue-500">
                    Browse image
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-10 w-full justify-between mt-6">
          {/* Stock Details */}
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_quantity">
                Quantity
              </label>
              <Input name="product_quantity" placeholder="Enter product quantity" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="units">
                Unit
              </label>
              <Input name="units" placeholder="Enter product unit" />
            </div>
          </div>

          {/* Pricing Section */}
          <div className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="product_mrp">
                Buying Price
              </label>
              <Input name="product_mrp" placeholder="Enter buying price" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="threshold_value">
                Threshold Value
              </label>
              <Input name="threshold_value" placeholder="Enter threshold value" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearest_expiry_date">
            Expiry Date
          </label>
          <Input name="nearest_expiry_date" placeholder="DD-MM-YYYY" type="date" />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product description"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-row-reverse gap-3">
          <button
            className="px-4 py-2.5 border-2 rounded bg-blue-700 text-white border-blue-700"
            type="submit"
          >
            Add Product
          </button>
          <button
            className="px-2 py-2.5 border-2 rounded hover:bg-red-700 hover:text-white hover:border-red-700"
            type="button"
            onClick={() => props.setAddProductPopUp(false)}
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

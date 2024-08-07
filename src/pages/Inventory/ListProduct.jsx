import React, { useState, useEffect } from "react";
import Input from "../../atoms/Input";
import axios from "../../../axios.jsx";

const formsFieldsArray = [
  {
    name: "product_name",
    label: "Product Name",
    placeholder: "Enter product name",
  },
  {
    name: "product_id",
    label: "Product Id",
    placeholder: "Enter product id",
  },
  {
    name: "product_mrp",
    label: "Buying Price",
    placeholder: "Enter buying price",
  },
  {
    name: "product_quantity",
    label: "Quantity",
    placeholder: "Enter product quantity",
  },
  {
    name: "units",
    label: "Unit",
    placeholder: "Enter product unit",
  },
  {
    name: "nearest_expiry_date",
    label: "Expiry Date",
    placeholder: "DD-MM-YYYY",
  },
  {
    name: "threshold_value",
    label: "Threshold Value",
    placeholder: "Enter threshold value",
  },
];

export const ListProduct = (props) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/store/getCategories", {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [UserToken]);

  const addProductHandle = async (event) => {
    event.preventDefault();
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

      if (props?.setStoreProductList) {
        const { setStoreProductList, setAddProductPopUp } = props;
        setStoreProductList((prevData) => [...prevData, data?.data]);
        setAddProductPopUp(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-white h-full px-4 py-6 m-2 rounded-lg w-5/6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-3">
      <div className="text-xl font-medium mb-3 text-gray-700">Add Product</div>

      <form action="" onSubmit={addProductHandle}>
        <div className="flex justify-center items-center text-center gap-5 mb-5">
          <div className="border-2 border-dashed rounded-lg h-20 w-20 border-gray-500 flex justify-center items-center">
            <p className="text-gray-500">{image ? image.name : "No Image"}</p>
          </div>
          <div className="font-normal text-gray-500">
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
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {formsFieldsArray.map((element) => (
            <div key={element.name}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={element.name}>
                {element.label}
              </label>
              <Input
                name={element.name}
                placeholder={element.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
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

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product description"
          />
        </div>

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

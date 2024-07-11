import React, { useState } from "react";
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
    name: "category",
    label: "Category",
    placeholder: "Enter category name",
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
    name: "expiry_date",
    label: "Expiry Date",
    placeholder: "Enter product expiry date",
  },
  {
    name: "threshold_value",
    label: "Threhold Value",
    placeholder: "Enter threshold value",
  },
];
export const ListProduct = (props) => {
  const [image, setImage] = useState(null);
  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const UserToken = localStorage.getItem("token");

  const addProductHandle = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("product_image", image);

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
  };
  return (
    <div className="bg-white px-4 py-6 m-2 rounded-lg w-[500px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-3">
      <div className="text-xl font-medium mb-3 text-gray-700">Add Product</div>

      <form action="" onSubmit={(e) => addProductHandle(e)}>
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

        {formsFieldsArray?.map((element) => {
          return (
            <Input
              name={element.name}
              label={element.label}
              placeholder={element.placeholder}
            />
          );
        })}

        <div className="flex flex-row-reverse gap-3">
          <button
            className="px-4 py-2.5 border-2 rounded bg-blue-700 text-white border-blue-700"
            type="submit"
          >
            Add Product
          </button>
          <button className="px-2 py-2.5 border-2 rounded hover:bg-red-700 hover:text-white hover:border-red-700">
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};

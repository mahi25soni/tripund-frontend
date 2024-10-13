import React, { useState, useEffect } from "react";
import Input from "../../atoms/Input";
import axios from "../../../axios.jsx";
import Spinner from "../../components/Spinner"; // Import the Spinner component
import { toast } from "react-toastify";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

export const ListProduct = ({ props }) => {
  const [images, setImages] = useState([null, null, null, null]); // Handle multiple images
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for spinner
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [suggestions, setSuggestions] = useState([]); // Suggestions state

  // States for form fields
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productMRP, setProductMRP] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [gst, setGst] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [thresholdStock, setThresholdStock] = useState("");
  

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

  // Fetch products for suggestions based on search term
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const response = await axios.get(
            `/generalProduct/search-products?query=${searchTerm}`,
            {
              headers: {
                Authorization: `Bearer ${UserToken}`,
              },
            }
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]); 
      }
    };

    fetchSuggestions();
  }, [searchTerm, UserToken]);

  const addProductHandle = async (event) => {
    event.preventDefault();
    setLoading(true); // Start spinner
    const formData = new FormData(event.target);

    images.forEach((image, index) => {
      if (typeof image === "string") {
        formData.append(`product_image_url_${index}`, image);
      } else if (image) {
        formData.append(`product_image_${index}`, image);
      }
    });

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
      setImages([null, null, null, null]);
      setSearchTerm(""); // Clear search term
      setSuggestions([]); // Clear suggestions
      event.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to list product.");
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.product_name); 
    const productImages = suggestion.product_img;
    setImages([
      productImages[0] || null,
      productImages[1] || null,
      productImages[2] || null,
      productImages[3] || null,
    ]);

    setProductName(suggestion.product_name);
    setProductQuantity(suggestion.product_quantity);
    setProductMRP(suggestion.product_mrp);
    setDescription(suggestion.product_description);
    setBrandName(suggestion.brand_name);
    setGst(suggestion.gst);

    setSuggestions([]);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file; // Update the specific image in the array
      setImages(updatedImages);
    }
  };

  return (
    <div className="bg-white px-4 py-4 m-2 rounded-lg border-3">
      {loading && <Spinner />} 
      <div className="flex gap-4 justify-between">
      <div className="text-xl font-medium mb-2 text-gray-700">Add Product</div>
      <div className="mb-4 w-1/2 relative">
      <div className="flex items-center border-none rounded-md overflow-hidden">
        <span className="p-3 text-blue-500 border">
          <FaSearch />
        </span>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products"
          className="py-2 px-4 w-full border focus:outline-none"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border shadow-lg w-full border-gray-300 z-10 mt-1 rounded-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer p-2  hover:bg-gray-200 transition-colors duration-200"
            >
            <li className="font-medium">
              {suggestion.product_name}
              </li>
              <li className="text-gray-400">
              Rs{suggestion.product_mrp} {suggestion.product_quantity}
              </li>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
      <form onSubmit={addProductHandle}>
       
        <div className="flex gap-8 w-full justify-between">
          {/* Basic Product Info */}
          <div className="w-full flex gap-4">
            <div className="mb-2 w-1/2">
              <label
                htmlFor="product_name"
              >
                Product Name
              </label>
              <Input
                name="product_name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            {/* Category Section */}
            <div className="mb-2 w-1/2">
              <label
                htmlFor="product_category"
              >
                Category
              </label>
              <select
                id="product_category"
                name="product_category"
                className="bg-white border border-gray-300 rounded py-3 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none w-full"
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
        </div>

        <div className="flex flex-row gap-4 w-full justify-between mt-6">
        <div className="w-full"> 
            <div className="mb-4">
              <label>
                Brand Name
              </label>
              <Input 
                name="brand_name" 
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full"> 
            <div className="mb-4">
              <label>
                Quantity(g/ml/l/kg)
              </label>
              <Input 
                name="product_quantity" 
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </div>
          </div>

         
        </div>

        
        <div className="flex flex-row gap-4 w-full justify-between mt-6">
        <div className="w-full">
            <div className="mb-4">
              <label>
                Product MRP
              </label>
              <Input 
                name="product_mrp" 
                value={productMRP}
                onChange={(e) => setProductMRP(e.target.value)} 
              />
            </div>
          </div>          <div className="w-full">
            <div className="mb-4">
              <label>
                GST
              </label>
              <Input 
                name="gst" 
                value={gst}
                onChange={(e) => setGst(e.target.value)} 
              />
            </div>
          </div>
        </div>


        <div className="flex flex-row gap-4 w-full justify-between mt-6">

        <div className="w-full">
  <div className="mb-4">
    <label>Total Stock</label>
    <Input 
      name="total_stock"
      value={totalStock}
      onChange={(e) => setTotalStock(e.target.value)}
    />
  </div>
</div>

<div className="w-full">
  <div className="mb-4">
    <label>Threshold Stock</label>
    <Input 
      name="threshold_stock"
      value={thresholdStock}
      onChange={(e) => setThresholdStock(e.target.value)}
    />
  </div>
</div>
</div>



        <div className="mb-6">
          <label
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="bg-white border h-32 border-gray-300 rounded py-3 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative border p-2 rounded-lg cursor-pointer bg-gray-100 flex items-center justify-center w-[200px] h-[200px] transition duration-300 ease-in-out hover:shadow-md hover:bg-gray-50"
              onClick={() =>
                document.getElementById(`imageInput${index}`).click()
              }
            >
              {image ? (
                typeof image === "string" ? (
                  // If the image is a URL from the backend
                  <img
                    name="product_img"
                    src={image}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  // If the image is a File object
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                )
              ) : (
                <BiSolidImageAdd className="text-4xl text-gray-400" />
              )}
              <input
                name="product_img"
                id={`imageInput${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, index)}
              />
            </div>
          ))}
        </div>

        <button
          className="px-4 w-1/2 mt-4 py-2.5 border-2 rounded bg-blue-700 text-white border-blue-700"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

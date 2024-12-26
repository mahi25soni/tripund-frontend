import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../atoms/Input";
import axios from "../../../axios";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { BiSolidImageAdd } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";

export const ListProduct = ({ props, onProductAdded }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const isEditMode = location.pathname.includes("edit");
  const { id } = useParams();

  // States for form fields
  const [editData, setEditData] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [productQuantity, setProductQuantity] = useState("");
  const [productMRP, setProductMRP] = useState("");
  const [description, setDescription] = useState("");
  const [brandName, setBrandName] = useState("");
  const [gst, setGst] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [thresholdStock, setThresholdStock] = useState("");
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);

  const UserToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/store/getCategories", {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        setCategories(response.data);

        if (response?.data?.length === 0) {
          setShowCategoryPopup(true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [UserToken]);

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

  useEffect(() => {
    if (isEditMode && id) {
      const fetchProductDetails = async () => {
        try {
          const { data } = await axios.get(
            `/storedata/get-store-product-by-id/${id}`,
            {
              headers: {
                Authorization: `Bearer ${UserToken}`,
              },
            }
          );
          console.log("Fetched data for edit:", data);
          setEditData(data?.data);
          setSelectedCategory(data?.data?.product_category.name);
          setProductName(data?.data.product_name);
          setProductQuantity(data?.data.product_quantity);
          setProductMRP(data?.data.product_mrp);
          setDescription(data?.data.description);
          setBrandName(data?.data?.brand_name);
          setGst(data?.data.gst);
          setTotalStock(data?.data?.total_stock);
          setThresholdStock(data?.data?.threshold_stock);
          const productImages = data?.data?.product_img;
          setImages([
            productImages[0] || null,
            productImages[1] || null,
            productImages[2] || null,
            productImages[3] || null,
          ]);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [isEditMode, id, UserToken]);

  const addProductHandle = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    images.forEach((image, index) => {
      if (typeof image === "string") {
        formData.append(`product_image_url_${index}`, image);
      } else if (image) {
        formData.append(`product_img`, image);
      }
    });

    try {
      if (isEditMode) {
        await axios.put(`/storedata/update-store-product/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${UserToken}`,
          },
        });
        toast.success("Product updated successfully!", 'success');
        navigate("/inventory/view-all");

      } else {
        const { data } = await axios.post(
          "/storedata/add-product-to-store",
          formData,
          {
            headers: {
              Authorization: `Bearer ${UserToken}`,
            },
          }
        );
        toast.success("Product added successfully!", 'sucsess');
        onProductAdded(data?.data?.data);
      }
    } catch (error) {
      console.error("Error Updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
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
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  return (
    <div className="bg-white px-4 py-4 m-2 rounded-lg border-3">
      {loading && <Spinner />}

      {showCategoryPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center w-72 ">
            <BsInfoCircle
              className="text-red-500 text-center w-full"
              size={20}
            />
            <h2 className="text-lg font-semibold my-4 text-red-500">
              No Categories Found!
            </h2>
            <p className="mb-4 text-gray-600 text-center">
              You need to create at least one category to add a product.
            </p>
            <Link to="/category">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:border hover:border-blue-600 ">
                Go to Category Page
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-between">
        <div className="text-xl font-medium mb-2 text-gray-700">
          {isEditMode ? "Edit Product" : "Add Product"}
        </div>
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
                  <li className="font-medium">{suggestion.product_name}</li>
                  <li className="text-gray-400">
                    Rs{suggestion.product_mrp} {suggestion.product_quantity}
                  </li>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isEditMode && !editData ? (
        <Spinner />
      ) : (
        <form onSubmit={addProductHandle}>
          <div className="flex gap-8 w-full justify-between">
            <div className="w-full flex gap-4">
              <div className="mb-2 w-1/2">
                <label htmlFor="product_name">Product Name</label>
                <Input
                  type="text"
                  id="productName"
                  name="product_name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              {/* Category Section */}
              <div className="mb-2 w-1/2">
                <label htmlFor="product_category">Category</label>
                <select
                  id="product_category"
                  name="product_category"
                  className="bg-white border border-gray-300 rounded py-3 px-3.5 text-gray-900 placeholder:text-gray-400 outline-none w-full"
                  defaultValue={selectedCategory}
                >
                  <option disabled value="">
                    Select Category
                  </option>
                  {categories?.map((category) => (
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
                <label>Brand Name</label>
                <Input
                  name="brand_name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="mb-4">
                <label>Quantity(g/ml/l/kg)</label>
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
                <label>Product MRP</label>
                <Input
                  name="product_mrp"
                  value={productMRP}
                  onChange={(e) => setProductMRP(e.target.value)}
                />
              </div>
            </div>{" "}
            <div className="w-full">
              <div className="mb-4">
                <label>GST</label>
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
                <p className="text-red-500">
                  Total Stock required & can't be less than Threshold Stock
                </p>
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
            <label htmlFor="description">Description</label>
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
                    <img
                      name="product_img"
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
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
            {isEditMode ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import axios from "../../axios.jsx";
import Spinner from "./Spinner.jsx";

export const EditOffer = ({ setEditOfferPopUp, offerId, setAllOffersList }) => {
  const [offerHeading, setOfferHeading] = useState("");
  const [offerDiscount, setOfferDiscount] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for fetching and submitting
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Loading state for submit action

  const UserToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchOfferData = async () => {
      if (!offerId) return;

      setLoading(true); // Set loading to true when fetching data
      try {
        const { data } = await axios.get(`/offer/get-offer-by-id/${offerId}`, {
          headers: { Authorization: `Bearer ${UserToken}` },
        });

        if (data?.success) {
          setOfferHeading(data.data.offer_heading || "");
          setOfferDiscount(data.data.offer_discount || "");
          setStartDate(new Date(data.data.start_date));
          setEndDate(new Date(data.data.end_date));

          const bannerUrl = data.data.offer_banner;
          setExistingImage(bannerUrl);
        }
      } catch (error) {
        console.error("Failed to fetch offer data", error);
      } finally {
        setLoading(false); // Set loading to false when fetching is done
      }
    };

    fetchOfferData();
  }, [offerId, UserToken]);

  const handleEditOffer = async (e) => {
    e.preventDefault();

    setLoadingSubmit(true); // Set loading to true when submitting

    const formData = new FormData();
    formData.append("offer_heading", offerHeading);
    formData.append("offer_discount", offerDiscount);
    formData.append("start_date", startDate.toISOString());
    formData.append("end_date", endDate.toISOString());
    if (image) {
      formData.append("image", image);
    }

    try {
      const { data } = await axios.put(`/offer/update-offer/${offerId}`, formData, {
        headers: {
          Authorization: `Bearer ${UserToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        setAllOffersList((prevData) =>
          prevData.map((offer) =>
            offer.id === offerId ? { ...offer, ...data?.data } : offer
          )
        );

        setEditOfferPopUp(false);

        // Refresh the page after successful submit
        window.location.reload();
      } else {
        console.error("Failed to update offer:", data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to update offer:", error);
    } finally {
      setLoadingSubmit(false); // Set loading to false after submit is done
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDiscard = () => {
    setEditOfferPopUp(false);
  };

  return (
    <div className="bg-white px-4 py-6 m-2 rounded-lg w-[500px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 ">
      <div className="text-xl font-medium mb-2 text-gray-700">Edit Offer</div>
      {loading ? (
        <Spinner/>
      ) : (
        <form>
          <div>
            <label htmlFor="offer_heading" className="block my-2 text-gray-900">
              Heading
            </label>
            <input
              type="text"
              name="offer_heading"
              id="offer_heading"
              value={offerHeading}
              onChange={(e) => setOfferHeading(e.target.value)}
              className="bg-white w-full border-2 border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900"
              placeholder="Enter Offer Heading"
            />
          </div>

          <div>
            <label htmlFor="offer_discount" className="block my-2 text-gray-900">
              Discount
            </label>
            <input
              type="number"
              name="offer_discount"
              id="offer_discount"
              value={offerDiscount}
              onChange={(e) => setOfferDiscount(e.target.value)}
              className="bg-white w-full border-2 border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900"
              placeholder="Enter Offer Discount in percentage"
            />
          </div>

          <div className="my-2 flex justify-between">
            <div className="w-full">
              <label htmlFor="start_date" className="block my-2 text-gray-900">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                className="bg-white w-full border-2 border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900"
              />
            </div>
            <div className="w-full ml-4">
              <label htmlFor="end_date" className="block my-2 text-gray-900">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                className="bg-white w-full border-2 border-gray-300 rounded-lg py-2.5 px-3.5 text-gray-900"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="my-4">
            <label className="block my-2 text-gray-900">Upload Offer Banner</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-40 cursor-pointer relative"
              onClick={() => document.getElementById("imageUploadEdit").click()}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : existingImage ? (
                <img
                  src={existingImage}
                  alt="Existing"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <AiOutlineCloudUpload size={40} />
                  <span>Click to upload</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id="imageUploadEdit"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-16 flex justify-between items-center gap-2">
            <button
              className="px-2 py-2.5 border-2 w-full rounded-md hover:bg-red-700 hover:text-white hover:border-red-700"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              className="px-4 py-2.5 border-2 w-full rounded-md bg-blue-700 text-white border-blue-700"
              type="button"
              onClick={handleEditOffer}
              disabled={loadingSubmit} 
            >
              {loadingSubmit ? (
                <Spinner/>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

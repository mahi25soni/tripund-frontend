import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineCheck,
} from "react-icons/ai";
import axios from "../../axios";
import { showToast } from "../atoms/Toast";

const AddHeading = ({ headings, setHeadings }) => {
  const [newHeading, setNewHeading] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedHeadings, setSelectedHeadings] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");

  const handleAddHeading = async () => {
    if (newHeading.trim()) {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Authorization token is missing.", "error");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "/store/addHeading",
          { heading: newHeading.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHeadings([...headings, response.data]);
        setNewHeading("");
        setIsOpen(false);
        showToast("Heading added successfully!", "success");
      } catch (error) {
        console.error(
          "Error adding heading:",
          error.response ? error.response.data : error.message
        );
        showToast("Failed to add heading. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("Heading cannot be empty.", "warning");
    }
  };

  const handleEditHeading = async () => {
    if (editedHeading.trim()) {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Authorization token is missing.", "error");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put(
          "/store/editHeading",
          { id: editMode, heading: editedHeading.trim() },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHeadings(
          headings.map((heading) =>
            heading._id === editMode ? response.data : heading
          )
        );
        setEditMode(null);
        setEditedHeading("");
        showToast("Heading edited successfully!", "success");
      } catch (error) {
        console.error(
          "Error editing heading:",
          error.response ? error.response.data : error.message
        );
        showToast("Failed to edit heading. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("Heading cannot be empty.", "warning");
    }
  };

  const handleCheckboxChange = (headingId) => {
    setSelectedHeadings((prevSelected) =>
      prevSelected.includes(headingId)
        ? prevSelected.filter((id) => id !== headingId)
        : [...prevSelected, headingId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedHeadings.length > 0) {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        showToast("Authorization token is missing.", "error");
        setLoading(false);
        return;
      }

      try {
        await axios.post(
          "/store/deleteHeadings",
          { ids: selectedHeadings },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHeadings(
          headings.filter((heading) => !selectedHeadings.includes(heading._id))
        );
        setSelectedHeadings([]);
        showToast("Selected headings deleted successfully!", "success");
      } catch (error) {
        console.error(
          "Error deleting headings:",
          error.response ? error.response.data : error.message
        );
        showToast("Failed to delete headings. Please try again.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      showToast("No headings selected for deletion.", "warning");
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4 rounded-md">
        <h2 className="text-lg font-semibold">Headings</h2>
        <div className="flex">
          <button
            onClick={handleDeleteSelected}
            className={`px-4 mr-2 py-2 bg-red-500 text-white rounded flex items-center ${
              selectedHeadings.length === 0 ? "hidden" : ""
            }`}
            disabled={selectedHeadings.length === 0 || loading}
          >
            <AiOutlineDelete size={20} />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Heading
          </button>
        </div> 
      </div>
      <div className="grid grid-cols-2 gap-4 border p-4 rounded h-80 overflow-x-auto">
  {headings.map((heading, index) => (
    <div
      key={heading._id}
      className="flex items-center font-medium justify-between bg-slate-100 rounded-md text-lg py-2 px-4 relative group"
      style={{ gridColumn: (index % 2) + 1 }} 
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={selectedHeadings.includes(heading._id)}
          onChange={() => handleCheckboxChange(heading._id)}
          className="mr-2"
        />
        {editMode === heading._id ? (
          <input
            type="text"
            value={editedHeading}
            onChange={(e) => setEditedHeading(e.target.value)}
            className="border p-1 rounded-md"
          />
        ) : (
          heading.heading
        )}
      </div>
      {editMode === heading._id ? (
        <div className="flex items-center bg-slate-100 p-2 ml-2 rounded-md ">
          <AiOutlineCheck
            size={20}
            className="text-green-500 cursor-pointer mr-2"
            onClick={handleEditHeading}
          />
          <AiOutlineClose
            size={20}
            className="text-red-500 cursor-pointer"
            onClick={() => {
              setEditMode(null);
              setEditedHeading("");
            }}
          />
        </div>
      ) : (
        <AiOutlineEdit
          size={20}
          className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700 group-hover:visible invisible"
          onClick={() => {
            setEditMode(heading._id);
            setEditedHeading(heading.heading);
          }}
        />
      )}
    </div>
  ))}
</div>


      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end">
                    <AiOutlineClose
                      size={20}
                      className="text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => setIsOpen(false)}
                    />
                  </div>

                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Heading
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newHeading}
                      onChange={(e) => setNewHeading(e.target.value)}
                      placeholder="New Heading"
                      className="border p-2 mb-2 w-full"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleAddHeading}
                      className="px-4 py-2 bg-blue-500 text-white rounded w-full flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          className="w-5 h-5 mr-2 animate-spin text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0116 0H4z"
                          ></path>
                        </svg>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddHeading;
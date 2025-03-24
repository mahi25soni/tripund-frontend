import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { Dialog } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeadingCategoryCombo = () => {
  const [headings, setHeadings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [selectedCombinations, setSelectedCombinations] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const [headingsResponse, categoriesResponse] = await Promise.all([
        axios.get('/store/getHeadings', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }),
        axios.get('/store/getCategories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setHeadings(headingsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openPopup = async () => {
    await fetchData();
    setIsOpen(true);
  };

  const handleHeadingClick = (headingId) => {
    setSelectedHeading(headingId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter((id) => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        '/store/headingCategoryCombo',
        {
          headingId: selectedHeading,
          categoryIds: selectedCategories,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the combinations state immediately
      setCombinations((prevCombinations) => [
        ...prevCombinations,
        response.data,
      ]);

      // Fetch combinations again to ensure the data is up-to-date
      await fetchCombinations();

      setSelectedHeading('');
      setSelectedCategories([]);
      toast.success('Combination saved successfully!');
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving combination:', error);
      toast.error('Failed to save combination. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCombinations = async () => {
    try {
      const token = localStorage.getItem('token');

      const combinationsResponse = await axios.get(
        '/store/getCombo',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCombinations(combinationsResponse.data);
    } catch (error) {
      console.error('Error fetching combinations:', error);
      toast.error('Failed to fetch combinations. Please try again.');
    }
  };

  useEffect(() => {
    fetchCombinations();
  }, []);

  const toggleSelectCombination = (id) => {
    setSelectedCombinations((prevSelectedCombinations) =>
      prevSelectedCombinations.includes(id)
        ? prevSelectedCombinations.filter((comboId) => comboId !== id)
        : [...prevSelectedCombinations, id]
    );
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('/store/deleteCombo', {
        data: { combinationIds: selectedCombinations },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      toast.success('Selected combinations deleted successfully.');
      setSelectedCombinations([]);
      fetchCombinations();
    } catch (error) {
      console.error('Error deleting combinations:', error);
      toast.error('Failed to delete combinations. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded min-h-96">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          Create Header and Category Combination
        </h2>
        <div>
          <button
            onClick={openPopup}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
          >
            Create Combo
          </button>
          {selectedCombinations.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Display "No combinations" message if no combinations */}
      {combinations.length === 0 ? (
        <p className="text-gray-400 text-center h-full">No combinations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinations.map((combo) => (
            <div className="relative bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
              <input
                type="checkbox"
                checked={selectedCombinations.includes(combo._id)}
                onChange={() => toggleSelectCombination(combo._id)}
                className="absolute top-2 right-2"
              />
              <h3 className="text-lg font-semibold mb-2 truncate">
                {combo.headingId?.heading}
              </h3>
              <div className="text-sm text-black w-full grid grid-cols-2 gap-2">
                {combo.categoryIds.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center bg-slate-100 p-2 rounded-lg border border-gray-200 min-w-[120px]"
                  >
                    <img
                      src={category.categoryImg}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded-lg mr-2"
                    />
                    <h3 className="text-sm font-medium break-words max-w-[calc(100%-3rem)] overflow-hidden">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={isOpen}
        onClose={handleCancel}
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full"
      >
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={handleCancel}
        />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-6xl w-full max-h-[80vh] overflow-y-auto p-6 relative z-10">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
            Select Heading and Categories
          </Dialog.Title>
          <hr className="my-4" />
          <div className="mt-2">
            {/* Show message if no data available */}
            {headings.length === 0 && categories.length === 0 ? (
              <p className="text-center text-gray-700">No data available.</p>
            ) : (
              <>
                {/* Show "Select Heading" only if headings are available */}
                {headings.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Heading</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {headings.map((heading) => (
                        <div
                          key={heading._id}
                          onClick={() => handleHeadingClick(heading._id)}
                          className={`cursor-pointer text-center h-12 p-2 rounded-lg border text-lg text-black ${
                            selectedHeading === heading._id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          } transition duration-300`}
                        >
                          {heading.heading}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Show "Select Categories" only if categories are available */}
                {categories.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Select Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {categories.map((category) => (
                        <div
                          key={category._id}
                          onClick={() => handleCategoryClick(category._id)}
                          className={`cursor-pointer text-lg h-12 text-center p-2 rounded-lg border ${
                            selectedCategories.includes(category._id)
                              ? "bg-green-500 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          } transition duration-300`}
                        >
                          {category.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-end gap-2 mt-10">
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white rounded transition duration-300`}
                disabled={
                  loading || !selectedHeading || selectedCategories.length === 0
                }
              >
                {loading ? "Saving..." : "Save Combination"}
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HeadingCategoryCombo;
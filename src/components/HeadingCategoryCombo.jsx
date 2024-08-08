import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';

const HeadingCategoryCombo = () => {
  const [headings, setHeadings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [selectedCombinations, setSelectedCombinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [headingsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/store/getHeadings', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            },
          }),
          axios.get('http://localhost:5000/api/store/getCategories', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setHeadings(headingsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleHeadingClick = (headingId) => {
    setSelectedHeading(headingId);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(categoryId)
        ? prevSelectedCategories.filter(id => id !== categoryId)
        : [...prevSelectedCategories, categoryId]
    );
  };

  const handleSubmit = async () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/store/headingCategoryCombo', {
        headingId: selectedHeading,
        categoryIds: selectedCategories,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSelectedHeading('');
      setSelectedCategories([]);
      alert('Combination saved successfully');
      setIsOpen(false);
    } catch (error) {
      console.error('Error saving combination:', error);
      alert('Failed to save combination');
    } finally {
      setLoading(false);
    }
  };

  const fetchCombinations = async () => {
    try {
      const token = localStorage.getItem('token');

      const combinationsResponse = await axios.get('http://localhost:5000/api/store/getCombo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCombinations(combinationsResponse.data);
      console.log(combinationsResponse.data);
    } catch (error) {
      console.error('Error fetching combinations:', error);
    }
  };

  useEffect(() => {
    fetchCombinations();
  }, []);

  const toggleSelectCombination = (id) => {
    setSelectedCombinations((prevSelectedCombinations) =>
      prevSelectedCombinations.includes(id)
        ? prevSelectedCombinations.filter(comboId => comboId !== id)
        : [...prevSelectedCombinations, id]
    );
  };

  const handleDeleteSelected = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://localhost:5000/api/store/deleteCombo', {
        data: { combinationIds: selectedCombinations },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Selected combinations deleted successfully.');
      setSelectedCombinations([]);
      fetchCombinations();
    } catch (error) {
      console.error('Error deleting combinations:', error);
      alert('Failed to delete combinations.');
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Create Header and Category Combination</h2>
        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          >
            Create Combo
          </button>
          {selectedCombinations.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {combinations.map((combo) => (
          <div key={combo._id} className="relative bg-white p-4 rounded shadow-md border border-gray-200">
            <input
              type="checkbox"
              checked={selectedCombinations.includes(combo._id)}
              onChange={() => toggleSelectCombination(combo._id)}
              className="absolute top-2 right-2"
            />
            <h3 className="text-lg font-semibold mb-2">{combo.headingId?.heading}</h3>
            <div className="text-sm text-gray-600">
              {combo.categoryIds.map((category) => (
                <div key={category._id} className="bg-white p-2 rounded shadow-md border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onClose={handleCancel} className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleCancel} />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-6xl w-full h-96 p-6 relative z-10">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
            Select Heading and Categories
          </Dialog.Title>
          <hr className="my-4" />
          <div className="mt-2">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Heading</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {headings.map((heading) => (
                  <div
                    key={heading._id}
                    onClick={() => handleHeadingClick(heading._id)}
                    className={`cursor-pointer text-center h-12 p-2 rounded border text-lg text-black ${selectedHeading === heading._id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  >
                    {heading.heading}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => handleCategoryClick(category._id)}
                    className={`cursor-pointer text-lg h-12 text-center p-2 rounded border ${selectedCategories.includes(category._id) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-10">
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
                disabled={loading || !selectedHeading || selectedCategories.length === 0}
              >
                {loading ? 'Saving...' : 'Save Combination'}
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded"
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

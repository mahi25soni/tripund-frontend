import React, { useState, useEffect } from 'react';
import axios from '../../../axios'; // Adjust import path if necessary

const IconGallery = ({ setIsIconGalleryOpen, onSelect }) => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get('/icons/getAllIcons'); // Update with your API endpoint
        setIcons(response.data.data);
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Select an Icon</h3>
          <button
            onClick={() => setIsIconGalleryOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-5 gap-4 bg-gray-100 p-4  max-h-[80vh] overflow-y-auto ">
          {icons.map((icon) => (
            <div
              key={icon._id}
              className="group relative p-2 rounded-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer bg-white"
              onClick={() => onSelect(icon.url)}
            >
              <img
                src={icon.url}
                alt={icon.name}
                className="w-full  object-cover rounded-lg shadow-sm transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IconGallery;

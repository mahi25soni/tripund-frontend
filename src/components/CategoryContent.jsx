import React from 'react';

const CategoryContent = () => {
  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        {/* First Container */}
        <div className="w-1/2 p-4 bg-gray-100 border rounded">
          <h2 className="mb-4">Categories</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Create Category</button>
        </div>

        {/* Second Container */}
        <div className="w-1/2 p-4 bg-gray-100 border rounded">
          <h2 className="mb-4">Headings</h2>
          <button className="px-4 py-2 bg-green-500 text-white rounded">Add Heading</button>
        </div>
      </div>

      {/* Third Container */}
      <div className="w-full p-4 bg-gray-100 border rounded">
        <h2 className="mb-4">Heading and Category Combo</h2>
        <button className="px-4 py-2 bg-purple-500 text-white rounded">Club Category with Headings</button>
      </div>
    </div>
  );
};

export default CategoryContent;

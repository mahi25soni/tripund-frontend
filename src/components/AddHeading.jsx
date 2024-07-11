// src/components/AddHeading.js
import React, { useState } from 'react';

const AddHeading = ({ headings, addHeading }) => {
  const [newHeading, setNewHeading] = useState('');

  const handleAddHeading = () => {
    if (newHeading.trim()) {
      addHeading(newHeading.trim());
      setNewHeading('');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Headings</h2>
      <ul className="mb-4">
        {headings.map((heading, index) => (
          <li key={index} className="border-b py-2">{heading}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newHeading}
        onChange={(e) => setNewHeading(e.target.value)}
        placeholder="New Heading"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleAddHeading} className="px-4 py-2 bg-green-500 text-white rounded w-full">
        Add Heading
      </button>
    </div>
  );
};

export default AddHeading;

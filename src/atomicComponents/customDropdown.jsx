// CustomDropdown.js
import React from 'react';

const CustomDropdown = ({ label, name, value, options, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-blue-500"
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="bg-white hover:bg-orange-500" // Tailwind classes for hover effect
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;

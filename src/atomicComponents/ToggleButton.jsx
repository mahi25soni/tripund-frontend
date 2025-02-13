// ToggleButton.js
import React from 'react';

const ToggleButton = ({ isActive, onToggle }) => {
  return (
    <div
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
      onClick={onToggle}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-8' : 'translate-x-0'}`}
      />
    </div>
  );
};

export default ToggleButton;

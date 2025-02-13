import React from 'react';

const CustomButton = ({ text, onClick, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-customOrange text-white px-6 py-2 rounded mt-4 w-full ${className}`}
    >
      {text}
    </button>
  );
};

export default CustomButton;

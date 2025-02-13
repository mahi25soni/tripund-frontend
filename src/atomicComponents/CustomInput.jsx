import React from 'react';

const CustomInput = ({ label, type = 'text', name, value, onChange, placeholder, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && <label className="block mb-2 text-md font-medium text-gray-600">{label}</label>}
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded"
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border-2 rounded"
        />
      )}
    </div>
  );
};

export default CustomInput;

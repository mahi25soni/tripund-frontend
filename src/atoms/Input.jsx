import React from "react";

export default function Input({
  name,
  label,
  placeholder,
  ...props
}) {
  return (
    <div className="mb-5 flex justify-between items-center">
      <label
        htmlFor={name}
        className="text-normal font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="ml-14 inline text-normal">
        <input
          type="text"
          name={name}
          id={name}
          autoComplete
          className="bg-white border-2 border-gray-400 rounded-lg py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none w-72 "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

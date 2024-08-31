import React from "react";

export default function Input({
  name,
  label,
  placeholder,
  ...props
}) {
  return (
    <div className="mb-1 flex items-center">
      <label
        htmlFor={name}
        className="font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="inline text-normal w-full">
        <input
          type="text"
          name={name}
          id={name}
          autoComplete
          className="bg-white border-2 border-gray-400 rounded py-2.5 px-3.5 text-gray-900 placeholder:text-gray-400  outline-none w-full "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

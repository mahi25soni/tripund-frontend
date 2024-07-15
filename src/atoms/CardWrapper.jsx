import React from "react";

export default function   CardWrapper({
  header_name,
  value,
  button_name,
  button_function,
  className,
  children,
  firstChildClasses
}) {
  return (
    <div className={`bg-white p-4 rounded-lg w-full ${className}`}>
      <div className={`flex flex-row justify-between items-center ${firstChildClasses}`}>
        <div className="flex flex-col justify-between gap-1 font-semibold text-xl">
          <p>{header_name}</p>
          {value && <p>{value}</p>}
        </div>
        <button className="px-4 py-1 border-2 rounded bg-blue-700 text-white border-blue-700" onClick={() => button_function()}>
          {button_name}
        </button>
      </div>
      {children}
    </div>
  );
}

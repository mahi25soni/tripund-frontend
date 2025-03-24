import React from "react";

export default function CardWrapper({
  header_name,
  value,
  button_name,
  button_function,
  className,
  children,
  firstChildClasses,
}) {
  return (
    <div className={`bg-white p-4 rounded-lg w-full ${className}`}>
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-4 ${firstChildClasses}`}
      >
        {/* Header and Value */}
        <div className="flex flex-col justify-between gap-1 font-semibold text-lg md:text-xl">
          <p>{header_name}</p>
          {value && <p>{value}</p>}
        </div>

        {/* Button */}
        <button
          className="px-4 py-2 border-2 rounded bg-customOrange text-white border-orange-700 w-full md:w-auto"
          onClick={() => button_function()}
        >
          {button_name}
        </button>
      </div>

      {/* Children */}
      {children}
    </div>
  );
}
import React from "react";

export default function AddHeaderCategory() {
  const categoriesData = [
    {
      header_name: "Fruits",
      sub_categories: ["Apples", "Oranges", "Bananas", "Grapes", "Pineapples"],
    },
    {
      header_name: "Vegetables",
      sub_categories: [
        "Carrots",
        "Broccoli",
        "Spinach",
        "Potatoes",
        "Tomatoes",
      ],
    },
    {
      header_name: "Seafood",
      sub_categories: ["Salmon", "Tuna", "Shrimp", "Lobster", "Crab"],
    },

    {
      header_name: "Seafood",
      sub_categories: ["Salmon", "Tuna", "Shrimp", "Lobster", "Crab"],
    },
  ];

  return (
    <div className="my-4 flex flex-row overflow-x-auto flex-nowrap">
      {categoriesData?.map((element, index) => (
        <div key={index} className="p-6 mr-4 flex flex-col bg-slate-100 h-[180px] w-[330px] gap-3 border-2 border-gray-200 flex-shrink-0">
          <p className="font-semibold text-base">{element.header_name}</p>
          <p className="font-medium text-gray-600">Category</p>
          <div className="flex flex-wrap text-center">
            {element?.sub_categories?.map((sub, subIndex) => (
              <p key={subIndex} className="rounded bg-white mr-2 mb-1 px-3">{sub}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

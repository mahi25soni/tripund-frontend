// src/components/Category.js
import React, { useState } from "react";
import AddCategory from "../../components/AddCategory";
import AddHeading from "../../components/AddHeading";
import AddedHeadersCategories from "../../components/AddedHeadersCategories";
import AddHeaderCategory from "../../components/AddHeaderCategory";
import CardWrapper from "../../atoms/CardWrapper";

const Category = () => {
  return (
    <div>
      {" "}
      <div className="rounded-lg flex flex-col gap-2">
        <div className="flex flex-row gap-2 ">
          <CardWrapper
            header_name={"Categories"}
            button_name={"Add Product"}
            value={"14"}
            className="h-[450px]"
          >
            <AddedHeadersCategories></AddedHeadersCategories>
          </CardWrapper>
          <CardWrapper
            header_name={"Categories Headers"}
            button_name={"Add Header"}
            value={"14"}
            className="h-[450px]"
          >
            <AddedHeadersCategories></AddedHeadersCategories>
          </CardWrapper>
        </div>
        <CardWrapper
          header_name={"Headers and Category Combo"}
          button_name={"Create"}
          className="h-[280px]"
        >
          <AddHeaderCategory></AddHeaderCategory>
        </CardWrapper>
        <div></div>
      </div>
    </div>
  );
};

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [headings, setHeadings] = useState([]);

//   const addCategory = (newCategory) => {
//     setCategories([...categories, newCategory]);
//   };

//   const addHeading = (newHeading) => {
//     setHeadings([...headings, newHeading]);
//   };

//   return (
//     <div className="flex flex-col md:flex-row p-4">
//       <div className="w-full md:w-1/2 p-4 border-r border-gray-200">
//         <AddCategory categories={categories} addCategory={addCategory} />
//       </div>
//       <div className="w-full md:w-1/2 p-4">
//         <AddHeading headings={headings} addHeading={addHeading} />
//       </div>
//     </div>
//   );
// };

export default Category;

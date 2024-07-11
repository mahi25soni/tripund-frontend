// src/components/Category.js
import React, { useState } from 'react';
import AddCategory from '../components/AddCategory';
import AddHeading from '../components/AddHeading';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [headings, setHeadings] = useState([]);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const addHeading = (newHeading) => {
    setHeadings([...headings, newHeading]);
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="w-full md:w-1/2 p-4 border-r border-gray-200">
        <AddCategory categories={categories} addCategory={addCategory} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <AddHeading headings={headings} addHeading={addHeading} />
      </div>
    </div>
  );
};

export default Category;

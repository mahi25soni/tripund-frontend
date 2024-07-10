import React, { useState } from 'react';

const AddCategory = ({ categories, addCategory }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryImages, setCategoryImages] = useState({});

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImages((prevImages) => ({
          ...prevImages,
          [index]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Categories</h2>
      <ul className="mb-4">
        {categories.map((category, index) => (
          <li key={index} className="border-b py-2 flex items-center gap-4">
           
            {category}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
        className="border p-2 mb-2 w-full"
      />
      
      <button onClick={handleAddCategory} className="px-4 py-2 bg-blue-500 text-white rounded w-full">
        Create Category
      </button>
    </div>
  );
};

export default AddCategory;

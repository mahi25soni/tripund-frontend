import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const AddCategory = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryImg, setcategoryImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = async () => {
    if (newCategory.trim() && categoryImg) {
      const formData = new FormData();
      formData.append('name', newCategory.trim());
      formData.append('categoryImg', categoryImg);


      const token = localStorage.getItem('token'); 

      try {
        const response = await axios.post('http://localhost:5000/api/categories/addCategory', formData, {
          headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }

        });
        
        setCategories([...categories, response.data]);
        setNewCategory('');
        setcategoryImg(null);
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setcategoryImg(file);
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2>Categories</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Category
        </button>
      </div>
      <div className="border p-4 rounded">
        <ul className="mb-4">
          {categories.map((category, index) => (
            <li key={index} className="border-b py-2 flex items-center gap-4">
              {category.name}
              {category.categoryImg && (
                <img src={category.categoryImg} alt={category.name} className="w-12 h-12 object-cover" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Add New Category
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New Category"
                      className="border p-2 mb-2 w-full"
                    />
                    <label className="block mb-2">Upload Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mb-4"
                    />
                    {categoryImg && (
                      <img
                        src={URL.createObjectURL(categoryImg)}
                        alt="Category Preview"
                        className="w-32 h-32 object-cover mb-4"
                      />
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleAddCategory}
                      className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                    >
                      Create Category
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AddCategory;

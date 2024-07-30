import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';

const AddCategory = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryImg, setCategoryImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(null); // Track edit mode
  const [editedCategory, setEditedCategory] = useState('');
  const [editedImage, setEditedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (editMode) {
      const category = categories.find(cat => cat._id === editMode);
      if (category) {
        setEditedCategory(category.name);
        setEditedImage(null); // Reset editedImage
        setImagePreview(category.categoryImg); // Set existing image URL as preview
      }
    }
  }, [editMode, categories]);

  useEffect(() => {
    if (editedImage) {
      // Create a preview URL for the new image
      setImagePreview(URL.createObjectURL(editedImage));
    } else if (!editMode && categoryImg) {
      // Create a preview URL for the new image when adding
      setImagePreview(URL.createObjectURL(categoryImg));
    }
  }, [editedImage, categoryImg, editMode]);

  const handleAddCategory = async () => {
    if (newCategory.trim() && categoryImg) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', newCategory.trim());
      formData.append('categoryImg', categoryImg);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.post('http://localhost:5000/api/store/addCategory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });

        setCategories([...categories, response.data]);
        setNewCategory('');
        setCategoryImg(null);
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCategory = async () => {
    if (editedCategory.trim()) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', editedCategory.trim());
      if (editedImage) formData.append('categoryImg', editedImage);
      formData.append('id', editMode);  // Include the category ID in the body
  
      const token = localStorage.getItem('token');
  
      try {
        const response = await axios.put('http://localhost:5000/api/store/editCategory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
  
        setCategories(categories.map(category => category._id === editMode ? response.data : category));
        setEditMode(null);
        setEditedCategory('');
        setEditedImage(null);
        setIsOpen(false);
      } catch (error) {
        console.error('Error editing category:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (editMode) {
        setEditedImage(file);
      } else {
        setCategoryImg(file);
      }
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-lg font-semibold'>Categories</h2>
        <button
          onClick={() => {
            setIsOpen(true);
            setEditMode(null);
            setNewCategory('');
            setCategoryImg(null);
            setImagePreview(null); // Reset preview
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Category
        </button>
      </div>
      <div className="border p-4 rounded h-80 overflow-x-auto">
        <div className="mb-4 grid grid-cols-1 gap-2 rounded-md">
          {categories.map((category) => (
            <div key={category._id} className="relative flex items-center gap-4 bg-slate-100 p-2 rounded-md group">
              <div className='bg-white p-2 rounded-md'>
                {category.categoryImg && (
                  <img src={category.categoryImg} alt={category.name} className="w-12 h-12 object-cover rounded-lg" />
                )}
              </div>
              <div className='text-lg flex-1'>{category.name}</div>
              <AiOutlineEdit
                size={20}
                className="cursor-pointer text-blue-500 cursor-pointer hover:text-blue-700 absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                onClick={() => {
                  setIsOpen(true);
                  setEditMode(category._id);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full p-6 relative z-10">
          <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
            {editMode ? 'Edit Category' : 'Add New Category'}
          </Dialog.Title>
          <div className="mt-2">
            <input
              type="text"
              value={editMode ? editedCategory : newCategory}
              onChange={(e) => editMode ? setEditedCategory(e.target.value) : setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="border p-2 mb-2 w-full"
            />
            <label className="block mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-4"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="w-32 h-32 object-cover mb-4"
              />
            )}
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={editMode ? handleEditCategory : handleAddCategory}
              className={`px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded`}
              disabled={loading}
            >
              {loading ? 'Processing...' : editMode ? 'Save Changes' : 'Create Category'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AddCategory;

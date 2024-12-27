import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import IconGallery from '../components/IconPack/IconGallery';
import { showToast } from '../atoms/Toast'; 
import DeleteAlertPopup from '../atoms/DeleteAlertPopup';

const AddCategory = ({ categories, setCategories }) => {
  const [newCategory, setNewCategory] = useState('');
  const [categoryImg, setCategoryImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isIconGalleryOpen, setIsIconGalleryOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (editMode) {
      const category = categories.find((cat) => cat._id === editMode);
      if (category) {
        setEditedCategory(category.name);
        setImagePreview(category.categoryImg);
        setCategoryImg(category.categoryImg);
      }
    }
  }, [editMode, categories]);


  const openDeletePopup = (categoryId) => {
    setSelectedId(categoryId);
    setIsPopupOpen(true);
  };


  const handleAddCategory = async () => {
    if (newCategory.trim() && imagePreview) {
      setLoading(true);

      const data = {
        name: newCategory.trim(),
        categoryImg: imagePreview,
      };

      const token = localStorage.getItem('token');

      try {
        const response = await axios.post('/store/addCategory', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCategories([...categories, response.data]);
        showToast('Category added successfully!', 'success');
        setNewCategory('');
        setCategoryImg(null);
        setImagePreview(null);
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding category:', error);
        showToast('Failed to add category. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      showToast('Please provide both a category name and an image.', 'warning');
    }
  };

  const handleEditCategory = async () => {
    if (editedCategory.trim()) {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', editedCategory.trim());
      formData.append('categoryImg', imagePreview);
      formData.append('id', editMode);

      const token = localStorage.getItem('token');

      try {
        const response = await axios.put('/store/editCategory', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(
          categories.map((category) =>
            category._id === editMode ? response.data : category
          )
        );
        showToast('Category updated successfully!', 'success');
        setEditMode(null);
        setEditedCategory('');
        setImagePreview(null);
        setIsOpen(false);
      } catch (error) {
        console.error('Error editing category:', error);
        showToast('Failed to update category. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      showToast('Please provide a valid category name.', 'warning');
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`/store/deleteCategory/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(categories.filter((category) => category._id !== selectedId));
      showToast('Category deleted successfully!', 'success');
      setIsPopupOpen(false); 

    } catch (error) {
      console.error('Error deleting category:', error);
      showToast('Failed to delete category. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleIconSelect = (url) => {
    setImagePreview(url);
    setCategoryImg(url);
    setIsIconGalleryOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button
          onClick={() => {
            setIsOpen(true);
            setEditMode(null);
            setNewCategory('');
            setCategoryImg(null);
            setImagePreview(null);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Category
        </button>
      </div>
      <div className="border p-4 rounded h-80 overflow-x-auto">
        <div className="mb-4 grid lg:grid-cols-2 gap-2 rounded-md">
          {categories.map((category) => (
            <div
              key={category._id}
              className="relative flex items-center gap-2 bg-slate-100 p-2 rounded-md group"
            >
              <div className="bg-white p-2 rounded-md">
                {category.categoryImg && (
                  <img
                    src={category.categoryImg}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="text-lg font-medium flex-1">{category.name}</div>
              <div className="flex gap-2 absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-100 p-2 opacity-0 group-hover:opacity-100  ">
  <AiOutlineEdit
    size={20}
    className="cursor-pointer text-blue-500 hover:text-blue-700"
    onClick={() => {
      setIsOpen(true);
      setEditMode(category._id);
    }}
  />
  <AiOutlineDelete
    size={20}
    className="cursor-pointer text-red-500 hover:text-red-700"
    onClick={() => openDeletePopup(category._id)}
  />
</div>

            </div>

          ))}
        </div>
      </div>

      {isOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-white rounded-xl overflow-hidden shadow-2xl max-w-lg w-full p-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {editMode ? 'Edit Category' : 'Add New Category'}
      </h3>
      <div className="space-y-6">
        <input
          type="text"
          value={editMode ? editedCategory : newCategory}
          onChange={(e) =>
            editMode
              ? setEditedCategory(e.target.value)
              : setNewCategory(e.target.value)
          }
          placeholder="Category Name"
          className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none px-4 py-2 text-gray-700"
        />

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex justify-center items-center relative hover:bg-gray-50 transition cursor-pointer"
          onClick={() => setIsIconGalleryOpen(true)}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Category Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-sm"
            />
          ) : (
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-gray-500">Click to add an image</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between items-center">
        <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 font-medium rounded text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={editMode ? handleEditCategory : handleAddCategory}
            className={`px-6 py-2 font-medium rounded text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : editMode
              ? 'Save Changes'
              : 'Create Category'}
          </button>
          
        </div>
      </div>
    </div>
  </div>
)}


      {/* Icon Gallery Popup */}
      {isIconGalleryOpen && (
        <IconGallery
          setIsIconGalleryOpen={setIsIconGalleryOpen}
          onSelect={handleIconSelect}
        />
      )}

      <div>
      <DeleteAlertPopup
        isOpen={isPopupOpen}
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={handleDeleteCategory}
        onCancel={() => setIsPopupOpen(false)}
      />
      </div>
    </div>
  );
};

export default AddCategory;

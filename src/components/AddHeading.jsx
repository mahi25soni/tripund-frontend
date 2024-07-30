import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import axios from 'axios';

const AddHeading = ({ headings, setHeadings }) => {
  const [newHeading, setNewHeading] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHeadings, setSelectedHeadings] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedHeading, setEditedHeading] = useState('');

  const handleAddHeading = async () => {
    if (newHeading.trim()) {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:5000/api/store/addHeading',
          { heading: newHeading.trim() },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setHeadings([...headings, response.data]);
        setNewHeading('');
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding heading:', error.response ? error.response.data : error.message);
        setError('Failed to add heading. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Heading cannot be empty.');
    }
  };

  const handleEditHeading = async () => {
    if (editedHeading.trim()) {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.put(
          'http://localhost:5000/api/store/editHeading',
          { id: editMode, heading: editedHeading.trim() },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setHeadings(headings.map(heading => heading._id === editMode ? response.data : heading));
        setEditMode(null);
        setEditedHeading('');
      } catch (error) {
        console.error('Error editing heading:', error.response ? error.response.data : error.message);
        setError('Failed to edit heading. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('Heading cannot be empty.');
    }
  };

  const handleCheckboxChange = (headingId) => {
    setSelectedHeadings(prevSelected =>
      prevSelected.includes(headingId)
        ? prevSelected.filter(id => id !== headingId)
        : [...prevSelected, headingId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedHeadings.length > 0) {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing.');
        setLoading(false);
        return;
      }

      try {
        await axios.post(
          'http://localhost:5000/api/store/deleteHeadings',
          { ids: selectedHeadings },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setHeadings(headings.filter(heading => !selectedHeadings.includes(heading._id)));
        setSelectedHeadings([]);
      } catch (error) {
        console.error('Error deleting headings:', error.response ? error.response.data : error.message);
        setError('Failed to delete headings. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setError('No headings selected for deletion.');
    }
  };

  return (
    <div className="p-4 bg-white ">
      <div className="flex justify-between items-center mb-4">
        <h2 className='text-lg font-semibold'>Headings</h2>
        <div className='flex'>
          <button
            onClick={handleDeleteSelected}
            className="px-4 mr-2 py-2 bg-red-500 text-white rounded flex items-center"
            disabled={selectedHeadings.length === 0 || loading}
          >
            <AiOutlineDelete size={20} />
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Heading
          </button>
        </div>
      </div>
      <div className="border p-4 rounded h-80 overflow-x-auto">
        <ul className="mb-4">
          {headings.map((heading) => (
            <li
              key={heading._id}
              className="flex items-center justify-between bg-slate-100 mb-2 rounded-md text-lg py-2 px-4 relative group"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedHeadings.includes(heading._id)}
                  onChange={() => handleCheckboxChange(heading._id)}
                  className="mr-4"
                />
                {editMode === heading._id ? (
                  <input
                    type="text"
                    value={editedHeading}
                    onChange={(e) => setEditedHeading(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  heading.heading
                )}
              </div>
              <div className="flex items-center">
                {editMode === heading._id ? (
                  <button
                    onClick={handleEditHeading}
                    className="ml-2 text-blue-500"
                  >
                    Save
                  </button>
                ) : (
                  <AiOutlineEdit
                    size={20}
                    className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700 group-hover:visible invisible"
                    onClick={() => {
                      setEditMode(heading._id);
                      setEditedHeading(heading.heading);
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="text-red-500">{error}</p>}

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
                    Add New Heading
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newHeading}
                      onChange={(e) => setNewHeading(e.target.value)}
                      placeholder="New Heading"
                      className="border p-2 mb-2 w-full"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={handleAddHeading}
                      className="px-4 py-2 bg-blue-500 text-white rounded w-full flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg className="w-5 h-5 mr-2 animate-spin text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="none" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
                        </svg>
                      ) : (
                        'Create Heading'
                      )}
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

export default AddHeading;

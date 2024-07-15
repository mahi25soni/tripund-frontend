import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const AddHeading = ({ headings, setHeadings }) => {
  const [newHeading, setNewHeading] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleAddHeading = async () => {
    if (newHeading.trim()) {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage

      try {
        const response = await axios.post(
          'http://localhost:5000/api/categories/addHeading',
          { heading: newHeading.trim() },
          {
            headers: {
              'Authorization': `Bearer ${token}` // Include the token in the headers
            }
          }
        );

        setHeadings([...headings, response.data]);
        setNewHeading('');
        setIsOpen(false);
      } catch (error) {
        console.error('Error adding heading:', error);
      }
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2>Headings</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Heading
        </button>
      </div>
      <div className="border p-4 rounded">
        <ul className="mb-4">
          {headings.map((heading, index) => (
            <li key={index} className="border-b py-2">{heading.heading}</li>
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
                      className="px-4 py-2 bg-blue-500 text-white rounded w-full"
                    >
                      Create Heading
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

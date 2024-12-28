// src/components/MobileViewModal.js
import React from 'react';
import { Dialog } from '@headlessui/react';

const MobileViewModal = ({ isModalOpen, closeModal }) => {
  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <Dialog.Panel className="bg-white p-6 rounded-lg max-w-sm mx-auto">
          <Dialog.Title className="text-xl font-semibold">
            Currently Available on Desktop View
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            This is currently available on desktop view. Please switch to a desktop or laptop to access it.
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MobileViewModal;

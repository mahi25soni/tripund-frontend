import React from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';

const ImageUpload = ({ image, onImageChange, index }) => {
  return (
    <div
      className="relative border p-2 rounded-lg cursor-pointer bg-gray-100 flex items-center justify-center w-[200px] h-[200px] transition duration-300 ease-in-out hover:shadow-md hover:bg-gray-50"
      onClick={() => document.getElementById(`imageInput${index}`).click()}
    >
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt={`Preview ${index}`}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <BiSolidImageAdd className="text-4xl text-gray-400" />
      )}
      <input
        id={`imageInput${index}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageChange}
      />
    </div>
  );
};

export default ImageUpload;

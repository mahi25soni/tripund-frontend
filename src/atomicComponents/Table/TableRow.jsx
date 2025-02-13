import React from 'react';

const TableRow = ({ children }) => {
  return (
    <tr className="hover:bg-gray-100 transition duration-300">
      {children}
    </tr>
  );
};

export default TableRow;

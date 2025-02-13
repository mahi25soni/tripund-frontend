import React from 'react';

const TableColumn = ({ data }) => {
  return (
    <td className="py-4 px-5 border-b text-gray-700">
      {data}
    </td>
  );
};

export default TableColumn;

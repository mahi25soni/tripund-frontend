import React from 'react';

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-red-100">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className="py-3 px-5 text-sm font-semibold text-gray-600 uppercase tracking-wider border-b"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

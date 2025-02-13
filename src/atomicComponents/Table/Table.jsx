import React from 'react';

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  table-auto text-left bg-white shadow-lg rounded-lg">
        {children}
      </table>
    </div>
  );
};

export default Table;

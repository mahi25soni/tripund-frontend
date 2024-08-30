import React from 'react';

const CustomerList = ({ customers }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Customers</h4>
      <ul className="list-disc list-inside">
        {customers.map(customer => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;

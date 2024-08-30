import React from 'react';

const StoreDetails = ({ store }) => {
  
  const customerCount = store.customers ? store.customers.length : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{store.name}</h2>
      <p><strong>ID:</strong> {store.id}</p>
      <p><strong>Location:</strong> {store.basicDetails.location}</p>
      <p><strong>Total Products:</strong> {store.productCount}</p>
      <p><strong>Customers:</strong> {customerCount}</p>
    </div>
  );
};

export default StoreDetails;

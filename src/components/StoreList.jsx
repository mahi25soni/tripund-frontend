import React from 'react';
import { Link } from 'react-router-dom';

const StoreList = ({ stores }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stores</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id} className="mb-4">
            <Link to={`/store/${store.id}`} className="text-blue-500 hover:underline">
              {store.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;

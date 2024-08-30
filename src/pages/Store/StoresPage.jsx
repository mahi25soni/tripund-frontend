import React, { useState, useEffect } from 'react';
import StoreList from '../../components/StoreList';
import { stores } from '../../api/storeData';

const StoresPage = () => {
  const [storeList, setStoreList] = useState([]);

  useEffect(() => {
    // In a real application, replace this with an API call
    setStoreList(stores);
  }, []);

  return (
    <div className="p-6">
      <StoreList stores={storeList} />
    </div>
  );
};

export default StoresPage;

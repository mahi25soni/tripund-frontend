import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreId = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/store/storeId', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStoreId(response.data.storeId);
      } catch (error) {
        console.error('Error fetching storeId:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreId();
  }, []);

  return (
    <StoreContext.Provider value={{ storeId, loading }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

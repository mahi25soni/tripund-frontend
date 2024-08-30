import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StoreDetails from '../../components/StoreDetails';
import DashboardLayout from '../../components/DashboardLayout';

// Mock data
const stores = [
  {
    id: 1,
    name: 'Store A',
    customers: [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com' },
      { id: 2, name: 'Priya Singh', email: 'priya@example.com' },
    ],
    productCount: 100,
    basicDetails: { location: 'Delhi', owner: 'Anjali Mehta' },
  },
  {
    id: 2,
    name: 'Store B',
    customers: [
      { id: 3, name: 'Vikram Patel', email: 'vikram@example.com' },
      { id: 4, name: 'Neha Gupta', email: 'neha@example.com' },
    ],
    productCount: 50,
    basicDetails: { location: 'Mumbai', owner: 'Rajesh Kumar' },
  },
  {
    id: 3,
    name: 'Store C',
    customers: [
      { id: 5, name: 'Amit Verma', email: 'amit@example.com' },
      { id: 6, name: 'Sonal Desai', email: 'sonal@example.com' },
    ],
    productCount: 75,
    basicDetails: { location: 'Bangalore', owner: 'Nandini Rao' },
  },
];

const StoreDetailsPage = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const findStore = () => {
      try {
        // Find the store with the matching ID from the mock data
        const storeData = stores.find(store => store.id === parseInt(id));
        
        if (storeData) {
          setStore(storeData);
        } else {
          throw new Error('Store not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    findStore();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <StoreDetails store={store} />
    </DashboardLayout>
  );
};

export default StoreDetailsPage;

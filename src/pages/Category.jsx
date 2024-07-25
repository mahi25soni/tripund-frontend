// src/components/Category.js
import React, { useState, useEffect } from 'react';
import AddCategory from '../components/AddCategory';
import AddHeading from '../components/AddHeading';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [headings, setHeadings] = useState([]);

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const addHeading = (newHeading) => {
    setHeadings([...headings, newHeading]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get('http://localhost:5000/api/categories/getCategories', config);
          console.log('Category: ', response.data);
        setCategories(response.data);
      }else {
        navigate('/login'); // Redirect to login if no token
      } 
    }catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get('http://localhost:5000/api/categories/getHeadings', config);
          console.log('Headings: ', response.data);
          setHeadings(response.data);
      }else {
        navigate('/login'); // Redirect to login if no token
      } 
    }catch (error) {
        console.error('Error fetching Headings:', error);
      }
    };

    fetchHeadings();
  }, []);


  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="w-full md:w-1/2 p-4 border-r border-gray-200">
      <AddCategory categories={categories} setCategories={setCategories} />
     
      </div>
      <div className="w-full md:w-1/2 p-4">
        <AddHeading headings={headings} addHeading={addHeading} />
      </div>
    </div>
  );
};

export default Category;

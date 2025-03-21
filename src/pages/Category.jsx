import React, { useState, useEffect } from 'react';
import AddCategory from '../components/AddCategory';
import AddHeading from '../components/AddHeading';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom'; 
import HeadingCategoryCombo from '../components/HeadingCategoryCombo';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [headings, setHeadings] = useState([]);
  const navigate = useNavigate(); 

  const addCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get('/categories/getCategories', config);
          console.log('Category: ', response.data);
          setCategories(response.data);
        } else {
          navigate('/login'); 
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [navigate]);

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get('/categories/getHeadings', config);
          console.log('Headings: ', response.data);
          setHeadings(response.data);
        } else {
          navigate('/login'); 
        }
      } catch (error) {
        console.error('Error fetching headings:', error);
      }
    };

    fetchHeadings();
  }, [navigate]);

  return (
    <div>
    <div className="flex flex-col gap-4 md:flex-row ">
      <div className="w-full md:w-1/2 rounded-lg shadow">
        <AddCategory categories={categories} setCategories={setCategories} />
      </div>
      <div className="w-full md:w-1/2 rounded-lg shadow">
        <AddHeading headings={headings} setHeadings={setHeadings} /> 
      </div>
    
    </div>
    <div className="w-full pt-4 rounded-lg shadow">
    <HeadingCategoryCombo categories={categories} headings={headings} />
    </div>
    </div>
  );
};

export default Category;

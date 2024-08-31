import React, { useState } from 'react';
import axios from '../../axios'
import { FiMail, FiLock } from 'react-icons/fi'; // Importing icons
import { BsInfoCircle } from 'react-icons/bs'; // Info icon for messages

import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import storeImg1 from '../images/store.jpg';
import storeImg2 from '../images/store2.png';
import storeImg3 from '../images/store3.jpg';
import { FaGoogle } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    console.log('User Data:', userData); 

    try {
      const res = await axios.post('/auth/register', userData);
      const token = res.data.token;
      console.log('Token:', token); 
      localStorage.setItem('token', token);      
      navigate('/createStore');
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center">
      <div className="h-screen flex bg-white rounded shadow-md w-full  overflow-hidden">
        <div className="w-3/5 flex flex-col justify-center items-center">
        
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={2000}
          >
            <div className="p-2">
              <h2 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text font-bold mb-4">We are helping stores come online</h2>
              <div className='w-3/5 m-auto'>
              <img src={storeImg1} alt="Helping stores" className="w-3/5 object-cover mx-auto" />
              </div>
            </div>
            <div className="p-2">
              <h2 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text font-bold mb-4 w-3/5">Get Your Own Mobile App For The Store</h2>
              <div className='w-3/5 m-auto' >
              <img src={storeImg2} alt="Helping stores" className="w-3/5  object-cover mx-auto" />
              </div>
            </div>
            <div className="p-2">
              <h2 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text font-bold mb-4 w-3/5">Sell To Your Customers Directly From The App</h2>
              <div className='w-3/5 m-auto'>
              <img src={storeImg3} alt="Helping stores" className="w-3/5  object-cover mx-auto" />
              </div>
            </div>
          </Carousel>
        </div>
        <div className="w-1/2 bg-blue-100 flex items-center justify-center">
          <div className="w-3/5 p-8 bg-white rounded-md shadow-md">
            {/* <h2 className="text-2xl font-bold mb-4 text-center">Create Acoount</h2> */}
            <div className="flex items-center justify-center mb-4">
          <BsInfoCircle className="text-blue-500 mr-2" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Please create your account to continue.
        </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input mt-1 block w-full border rounded py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input mt-1 block w-full rounded border py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input mt-1 block w-full rounded border py-2"
                  required
                />
              </div>
              <button type="submit" className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600">Get Started</button>
            </form>
            
            <button className='flex border w-full justify-center py-2 mt-4'><FaGoogle className='mt-1 mx-4 text-blue-500' /> Sign Up via Google</button>

            <div className='flex w-fit m-auto'>
            <h3 className='mt-4'>Already a user</h3>
            <a href='/login' className="text-blue-500 hover:underline mt-4 mx-2 block">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

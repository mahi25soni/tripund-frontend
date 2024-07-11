import React, { useState } from 'react';
import axios from '../../axios'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email, password };
    console.log('User Data:', userData);
    try {
      const res = await axios.post('/auth/login', userData);
      const token = res.data.token;
      console.log('Token:', token); 
      localStorage.setItem('token', token);
      if(res?.data?.store_id) {
        localStorage.setItem('store_id', res?.data?.store_id);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err); 
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
        </form>

        <Link to='/Signup'>Signup</Link>
      </div>
    </div>
  );
};

export default Login;

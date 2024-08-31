import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { FiMail, FiLock } from 'react-icons/fi'; // Importing icons
import { BsInfoCircle } from 'react-icons/bs'; // Info icon for messages

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = { email, password };

    try {
      const res = await axios.post('/auth/login', userData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      if (res?.data?.store_id) {
        localStorage.setItem('store_id', res?.data?.store_id);
      }
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <BsInfoCircle className="text-blue-500 mr-2" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back!</h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Please login to your account to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <div className="flex items-center border rounded-lg mt-1">
              <FiMail className="text-gray-500 ml-3" size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input block w-full rounded-r-lg border-0 py-2 px-3 focus:ring-0"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <div className="flex items-center border rounded-lg mt-1">
              <FiLock className="text-gray-500 ml-3" size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input block w-full rounded-r-lg border-0 py-2 px-3 focus:ring-0"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600 flex justify-center items-center transition-colors duration-300"
            disabled={loading}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/Signup" className="text-blue-500 hover:underline">
            Don't have an account? Signup
          </Link>
          <div className="mt-2">
            <Link to="/forgot-password" className="text-gray-400 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from '../../../axios';
import { toast } from 'react-toastify';
import { FiMail } from 'react-icons/fi'; // Email icon
import { BsInfoCircle } from 'react-icons/bs'; // Info icon for the message

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put('/auth/forgot-password', { email });
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error('Error sending reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <BsInfoCircle className="text-blue-500 mr-2" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Forgot Your Password?</h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleForgotPassword}>
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
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600 flex justify-center items-center transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

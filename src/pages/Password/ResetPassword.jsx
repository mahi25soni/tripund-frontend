import React, { useState } from 'react';
import axios from '../../../axios'; // Adjust path to your axios instance
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi'; // Icons for password fields and show/hide functionality
import { BsShieldLock } from 'react-icons/bs'; // Shield lock icon for the header

const ResetPassword = () => {
  const { token } = useParams(); // Extract the reset token from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.put('/auth/reset-password', { token, password });
      toast.success('Password has been reset successfully!');
      navigate('/login'); // Navigate to the login page upon successful password reset
    } catch (err) {
      toast.error('Error resetting password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-4">
          <BsShieldLock className="text-blue-500 mr-2" size={24} />
          <h2 className="text-2xl font-semibold text-gray-800">Reset Your Password</h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Please enter and confirm your new password below.
        </p>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">New Password:</label>
            <div className="flex items-center border rounded-lg mt-1">
              <FiLock className="text-gray-500 ml-3" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input block w-full rounded-r-lg border-0 py-2 px-3 focus:ring-0"
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                className="text-gray-500 mr-3 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirm Password:</label>
            <div className="flex items-center border rounded-lg mt-1">
              <FiLock className="text-gray-500 ml-3" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input block w-full rounded-r-lg border-0 py-2 px-3 focus:ring-0"
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className="text-gray-500 mr-3 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white py-2 px-4 rounded hover:bg-blue-600 flex justify-center items-center transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import StoreForm from './pages/CreateStore';
import Category from './pages/Category';
import Layout from './components/Layout'; // Adjust the import path as needed

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createStore" element={<StoreForm />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />

          {/* Default redirect to signup if no match */}
          {/* <Route path="*" element={<Navigate to="/signup" />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

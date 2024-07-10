import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import StoreForm from './pages/CreateStore';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createStore"
          element={
            <ProtectedRoute>
              <StoreForm />
            </ProtectedRoute>
          }
        />
        {/* Default redirect to signup if no match */}
        {/* <Route path="*" element={<Navigate to="/signup" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

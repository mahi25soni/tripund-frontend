import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import StoreForm from './pages/CreateStore';
import AddCategory from './components/AddCategory';
import Category from './pages/Category';
import DashboardLayout from './components/DashboardLayout';

const App = () => {
  return (
    <Router>
     <DashboardLayout>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addcategory" element={<AddCategory/>} />
        <Route path="/category" element={<Category/>} />

        <Route
          path="/"
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
       
      </Routes>
      </DashboardLayout>
    </Router>
  );
};

export default App;

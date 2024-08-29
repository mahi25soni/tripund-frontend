import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import StoreForm from "./pages/CreateStore";
import Category from "./pages/Category";
import Layout from "./components/Layout";
import { InventoryViewAll } from "./pages/Inventory/InventoryViewAll";
import { ListProduct } from "./pages/Inventory/ListProduct";
import { Offer } from "./pages/Offer/Offer";
import Reports from "./pages/Reports";

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

          <Route
            path="/inventory/view-all"
            element={
              <ProtectedRoute>
                <InventoryViewAll />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory/list-product"
            element={
              <ProtectedRoute>
                <ListProduct />
              </ProtectedRoute>
            }
          />

        <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <Offer/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports/>
              </ProtectedRoute>
            }
          />

          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

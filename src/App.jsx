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
import Category from "./pages/Category/Category";
import Layout from "./components/Layout"; // Adjust the import path as needed
import { InventoryViewAll } from "./pages/Inventory/InventoryViewAll";
import { ListProduct } from "./pages/Inventory/ListProduct";
import { Offer } from "./pages/Offer/Offer";

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

          {/* Default redirect to signup if no match */}
          {/* <Route path="*" element={<Navigate to="/signup" />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

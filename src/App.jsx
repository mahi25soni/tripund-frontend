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
import ProductDetails from "./components/ProductDetails";
import { Orders } from "./pages/Order/Orders";
import Settings from "./pages/Settings";
import SupportPage from "./pages/Support";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from "./pages/Password/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import IconGallery from "./components/IconPack/IconGallery";

const App = () => {
  return (
    <Router>
      <Layout>
      <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/createStore" element={<StoreForm />} />
          <Route path="/icon-gallery" element={<IconGallery />} />

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
            path="/inventory/product/:productId"
            element={
              <ProtectedRoute>
                <ProductDetails />
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
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
            }
          />


          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <Offer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />


          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings/>
              </ProtectedRoute>
            }
          />

          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage/>
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

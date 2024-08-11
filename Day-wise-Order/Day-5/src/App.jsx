import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Shared/Home";
import Login from "./pages/Shared/Login";
import Register from "./pages/Shared/Register";
import UserLayout from "./layout/UserLayout";
import UserDashboard from "./pages/User/UserDashboard";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import NotFound from "./pages/Shared/NotFound";
import HomeLayout from "./layout/HomeLayout";
import ProductDash from "@/components/Admin/ProductDash";
import UserDash from "./components/Admin/UserDash";
import SaleDash from "./components/Admin/SaleDash";
import SupplierDash from "./components/Admin/SupplierDash";
import OrderPage from "./pages/User/OrderPage";
import { UserProvider } from "./components/UserContext"; // Ensure this path is correct
import ProtectedRoute from "./ProtectedRoute"; // Adjust the path as needed
import ReviewDash from "./components/Admin/ReviewDash";
import PurchaseDash from "./components/Admin/PurchaseDash";
import { Client } from "@gradio/client";
import { useEffect } from "react";
import SalesDash from "./components/Admin/SalesDash";

const App = () => {
 

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<UserDashboard />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/order/:product" element={<OrderPage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <UserDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <ProductDash />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/sales"
              element={
                <ProtectedRoute>
                  <SaleDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/suppliers"
              element={
                <ProtectedRoute>
                  <SupplierDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute>
                  <ReviewDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/purchases"
              element={
                <ProtectedRoute>
                  <PurchaseDash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bonk"
              element={
                <ProtectedRoute>
                  <SalesDash/>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

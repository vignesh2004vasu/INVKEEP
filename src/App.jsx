import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Shared/Home';
import Login from './pages/Shared/Login';
import Register from './pages/Shared/Register';
import UserLayout from './layout/UserLayout';
import UserDashboard from './pages/User/UserDashboard';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/Shared/NotFound';
import HomeLayout from './layout/HomeLayout';
import ProductDash from './components/Admin/ProductDash';
import UserDash from './components/Admin/UserDash';
import { UserProvider } from './components/UserContext'; // Ensure this path is correct

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route path='/dashboard' element={<UserDashboard />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/users' element={<UserDash />} />
            <Route path='/admin/products' element={<ProductDash />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

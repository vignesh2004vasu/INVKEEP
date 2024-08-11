import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Shared/Navbar';
import Footer from '@/components/Shared/Footer';

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow  items-center justify-center pt-16"> {/* Adjusted padding to match navbar height */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;

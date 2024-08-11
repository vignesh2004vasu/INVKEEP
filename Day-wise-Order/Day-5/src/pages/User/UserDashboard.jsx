import React from 'react';
import image1 from '/src/assets/u1.jpg';
import image2 from '/src/assets/u2.jpg';
import image3 from '/src/assets/u3.jpg';
import { useTheme } from '@/components/theme-provider';

function UserDashboard() {
  const { theme } = useTheme();

  const getBackgroundColor = (index) => {
    return theme === 'dark'
      ? 'bg-gray-800'  // Updated to use bg-gray-800
      : index % 2 === 0
      ? 'bg-white'
      : 'bg-gray-100';
  };

  const getTextColor = () => {
    return theme === 'dark' ? 'text-white' : 'text-black';
  };

  return (
    <div className="w-full h-full">
      <section className={`flex flex-col md:flex-row h-screen  ${getTextColor()} ${getBackgroundColor(0)}`}>
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Welcome to Our Inventory Management</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}></div>
      </section>
      <section className={`flex flex-col md:flex-row-reverse h-screen ${getTextColor()} ${getBackgroundColor(0)}`}>
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Manage Your Products Efficiently</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image2})` }}></div>
      </section>
      <section className={`flex flex-col md:flex-row h-screen ${getTextColor()} ${getBackgroundColor(0)}`}>
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Track Sales and Revenue</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image3})` }}></div>
      </section>
    </div>
  );
}

export default UserDashboard;

import React from 'react'
import image1 from '/src/assets/u3.jpg';
import { useTheme } from '@/components/theme-provider';

const AdminDashboard = () => {
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
        <>
        <div className="w-full">
      <section className={`flex flex-col md:flex-row h-screen ${getTextColor()} ${getBackgroundColor(0)}`}>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}></div>
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Welcome to Admin Dashboard</h1>
        </div>
      </section>
      </div>
        
        </>
    )
}

export default AdminDashboard
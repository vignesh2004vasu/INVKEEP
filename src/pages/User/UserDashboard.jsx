import React from 'react';
import image1 from '/src/assets/u1.jpg';
import image2 from '/src/assets/u2.jpg';
import image3 from '/src/assets/u3.jpg';

function UserDashboard() {
  return (
    <div className="w-full h-full">
      <section className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Welcome to Our Inventory Management</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image1})` }}></div>
      </section>
      <section className="flex flex-col md:flex-row-reverse h-screen bg-gray-800 text-white">
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Manage Your Products Efficiently</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image2})` }}></div>
      </section>
      <section className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <h1 className="text-4xl md:text-6xl">Track Sales and Revenue</h1>
        </div>
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${image3})` }}></div>
      </section>
    </div>
  );
}

export default UserDashboard;

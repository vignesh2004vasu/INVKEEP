import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full h-32 bg-gray-800 text-white flex flex-col items-center justify-between px-6 py-4 border-t-2 border-gray-700">
      <div className="w-full flex items-center justify-between mb-4">
        <div className="text-lg font-bold">
          ©INVKEEP 2024
        </div>
        <div className="flex items-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white flex justify-center items-center">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white flex justify-center items-center">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white flex justify-center items-center">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white flex justify-center items-center">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-400">
        <p>Invkeep</p>
        <p>Arivoli Nagar, Kovaipudur, Coimbatore</p>
        <p>All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Import icons

const Header = () => {
  return (
    <header className="bg-transparent text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and App Name */}
        <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-300">
          TurfTracker
        </Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/login" className="flex items-center text-sm font-medium text-white hover:bg-gray-700 hover:text-gray-100 px-3 py-1 rounded-md transition duration-300">
            <FaSignInAlt className="text-xl mr-1" /> Login
          </Link>
          <Link to="/signup" className="flex items-center text-sm font-medium text-white bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded-md transition duration-300">
            <FaUserPlus className="text-xl mr-1" /> Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
